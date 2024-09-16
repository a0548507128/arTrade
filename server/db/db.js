const mySql = require('mysql');

async function query(sqlCommande,callback ) {
    const connection = mySql.createConnection({
        host: "localhost",
        user: "root",
        password: "a1b2c3d4",
        database: "db"
    })
    connection.connect((err) => {
        if (err) throw err;
        console.log('connected!'); 
        connection.query(sqlCommande, (err, result) => {
            callback(result);  
        })
     })
}

module.exports = { query };