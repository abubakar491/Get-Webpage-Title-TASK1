const express = require('express');

const {getTitles} = require('./controller/fetch-title');
const validateQueryParams = require('./controller/validate-query-params');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'pug');



app.get('/I/want/title', (req, res) => {

    const address = req.query.address;
    const addressArray = validateQueryParams(address); 
    getTitles(addressArray, (result)=>{
        console.log(result);
        res.render('index', {"results": result});
    });
});

app.get('*', (req, res)=> {
    res.status(404).send('<h3>ERROR 404</h3>');
});
  

app.listen(port, () => console.log(`Server listening on PORT:  ${port}!`))
