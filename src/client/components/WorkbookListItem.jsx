import React from 'react';

export const WorkbookListItem = ({
  workbook: {
    id,
    thumbnail,
    projectName,
    ownerName,
    updatedAt,
    site
  }
}) =>
<li>
  { thumbnail ? <img src={thumbnail} /> : <span>Loading thumbnail...</span>}
  <p>{projectName}</p>
  <p>{ownerName}</p>
  <p>{updatedAt}</p>
  <p>{site}</p>
</li>
