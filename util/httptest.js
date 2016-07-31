const request = require('request');

const url = 'http://localhost:3001/mobile/feedback/api/myproblems?uid=47734976';

request(url, function (error, response, body) {
    if (error) throw error;
    if (response.statusCode == 200) {
        console.log(body);
    }
});