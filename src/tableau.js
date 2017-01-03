const request = require('request');
const xml2js = require('xml2js');
const Promise = require('bluebird');

const SERVER = "https://tableau.ics.uci.edu";

// See notes about SSO and SAML ...
//const aSERVER = "https://10az.online.tableau.com";

const tableau = module.exports = {
  signIn: (name, password, site) => {
    return new Promise(function(resolve, reject) {
      request({
        method: 'POST',
        url: SERVER+'/api/2.3/auth/signin',
        body: `
        <tsRequest>
        <credentials name="${name}" password="${password}" >
        <site contentUrl="${site}" />
        </credentials>
        </tsRequest>
        ` 
      }, function (error, response, body) {
        if (error) return reject(error);
        if (response.statusCode !== 200) {
          return reject(new Error('not 200'));
        }
        xml2js.parseString(body, function (err, result) {
          try {
            var cred = result.tsResponse.credentials[0];
            var token = cred.$.token;
            var siteId = cred.site[0].$.id;
            var userId = cred.user[0].$.id;

            resolve({ token, siteId, userId });
          } catch (e) {
            reject(e);
          }
        })
      })
    });
  },
  queryWorkbooksForUser: (token, siteId) => {
    return new Promise(function(resolve, reject) {
      request({
        url: `${SERVER}/api/2.3/sites/${siteId}/workbooks`,
          headers: {
          "X-Tableau-Auth": token
        }
      }, function (error, response, body) {
        if (error) return reject(error);
        if (response.statusCode !== 200) {
          console.log(response.statusCode);
        }
        xml2js.parseString(body, function(err, res) {
          if ( err ) return reject(error);

          resolve(Promise.mapSeries(res.tsResponse.workbooks[0].workbook, (wb)=>{
            return tableau.getUserInformation(token, siteId, wb.owner[0].$.id).then((ownerName) =>{
              console.log(ownerName);
              return Object.assign({}, wb.$, {
                projectId: wb.project[0].$.id,
                projectName: wb.project[0].$.name,
                ownerName
              })
            })
          })
          )
        });
      })
    });
  },
  getPreviewImageForWorkbook: (token, siteId, workbookId) => {
    return new Promise(function(resolve, reject) {
      request({
        encoding: null,
        url: `https://tableau.ics.uci.edu/api/2.3/sites/${siteId}/workbooks/${workbookId}/previewImage`,
          headers: {
          "X-Tableau-Auth": token
        }
      }, function (error, response, body) {
        if (error) return reject(error);
        if (response.statusCode !== 200) {
          reject(response.statusCode);
        }
        resolve({ png: body })
      })
    });
  },
  getUserInformation: (token, siteId, userId) => {
    return new Promise(function(resolve, reject) {
      request({
        url: `${SERVER}/api/2.3/sites/${siteId}/users/${userId}`,
          headers: {
          "X-Tableau-Auth": token
        }
      }, function (error, response, body) {
        if (error) return reject(error);
        if (response.statusCode !== 200) {
          reject(response.statusCode);
        }
        else{
        xml2js.parseString(body, function(err, res) {
          if ( err ) return reject(error);

          resolve(res.tsResponse.user[0].$.fullName);
        });
        }
      })
    });
  },
}
