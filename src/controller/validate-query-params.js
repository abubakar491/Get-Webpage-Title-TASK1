
const validateQueryParams = (address) => {
    let addressArray = [];
    if(Array.isArray(address)){
        return address;
    }else{
        addressArray.push(address);
        return addressArray;
    }
}

module.exports = validateQueryParams;