'use strict';

const request = require('superagent');

exports.send = (method, path, header, query, data, isForm) => 
  new Promise((resolve, reject) => {
    const q = request[method](`${path}`);

    header && q.set(header);
    
    query && q.query(query);

    data && q.send(data);

    isForm && q.type('form');

    q.end((err, result) => {
      if (err) {
        console.trace(err);
        reject(err);
      } else {
        resolve(result.body);
      }
    });
  });