const mongoose = require('mongoose');

//Connectivity with database--> 

async function mongoDbConnection(url){
    return mongoose.connect(url).then(()=>{
        console.log('Mongo-Db started!');  
    }).catch((err)=>{
        console.log(`An Error occurred: ${err}`);
    });
}

module.exports = {mongoDbConnection};