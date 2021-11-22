const https = require('https');

function getData(options) {
    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            if (res.statusCode > 299) {
                reject(new Error(`Status code: ${res.statusCode}`));
            }
            else {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { getData };