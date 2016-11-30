const request = require('request');
const xml2js = require('xml2js');

const SERVER = "https://tableau.ics.uci.edu";

// See notes about SSO and SAML ...
//const SERVER = "https://10az.online.tableau.com";

module.exports = {
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
  }
}
