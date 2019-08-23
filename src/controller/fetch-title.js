const request = require('request');
const cheerio = require('cheerio');

const validateUrl = require('./validate')
const validateQueryParams = require('./validate-query-params');

const fetchTitle = async(link, callback) => {
    request(link , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const title = $("title").text();
            if(title){
                callback({
                    link:link,
                    title:title
                });
            }else{
                callback({
                    link:link,
                    title:"Unable to get Title Text"
                });
            }

        }else{
            callback({
                link:link,
                title:"Page Not Found"
            })
        }
    });
}

const getTitles = (addressArray, callback) => {
    let resultArray = [];
    
    addressArray.forEach(link => {
        const validatedLink = validateUrl(link);
        fetchTitle(validatedLink, (result)=>{
            //console.log(result);
            resultArray.push(result);
            if(addressArray.length === resultArray.length){
                callback(resultArray);
            }
        });
    });
    
}

module.exports = {getTitles};
