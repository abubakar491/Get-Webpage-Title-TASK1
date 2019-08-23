const express = require('express');

const {getTitles} = require('./controller/fetch-title');
const validateQueryParams = require('./controller/validate-query-params');

const app = express();
app.set('view engine', 'pug');
const port = process.env.PORT || 3000;


app.get('/home', (req, res) => {

    const address = req.query.address;
    const addressArray = validateQueryParams(address); 
    getTitles(addressArray, (result)=>{
        console.log(result);
        res.render('index', {"results": result});
    });
});

app.listen(port, () => console.log(`Server listening on PORT:  ${port}!`))
