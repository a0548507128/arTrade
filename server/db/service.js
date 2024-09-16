
const db = require('./db');


async function addNewCreation(req, callback) {
  console.log(req.params.userId,req.body.creationName,req.body.creationDescription,req.body.creationPrice,req.body.creationType);
    let sqlCommande = `INSERT INTO creations (seller_id, upload_date, name_of_creation, descript_of_creation, price, creation_type) VALUES('${req.params.userId}','1999-02-02 22:22:22','${req.body.creationName}','${req.body.creationDescription}','${req.body.creationPrice}','${req.body.creationType}')`;
    db.query(sqlCommande, callback);
}
  
async function getUserTypes(callback) {
    let sqlCommande = 'SELECT type FROM user_types';
    db.query(sqlCommande, callback);
}

async function getAllCreations(callback) {
    let sqlCommande = 'SELECT * FROM creations';
    db.query(sqlCommande, callback);
}

async function logIn(req, callback) {
    let sqlCommande = `SELECT * FROM users WHERE mail='${req.body.mail}' AND password='${req.body.password}'`;
    db.query(sqlCommande, callback);
}

async function getCreationDetails(req, callback) {
    let sqlCommande = `SELECT * FROM creations WHERE id=${req.params.creationId}`;
    db.query(sqlCommande, callback);
}

async function signUp(req, callback) {
    let sqlCommande = `INSERT INTO users (mail, first_name, last_name, phone, user_type, password) VALUES ('${req.body.mail}', '${req.body.firstName}' , '${req.body.lastName}' , '${req.body.phone}' ,(SELECT id from user_types WHERE type='${req.body.userType}'), '${req.body.password}')` ;
    db.query(sqlCommande, callback);
}

async function getUserType(req, callback){
    let sqlCommande = `SELECT ut.type FROM user_types ut JOIN users u ON u.user_type=ut.id WHERE u.id=${req.params.userId}`;
    db.query(sqlCommande, callback);
}


// async function getOneMessage(req, callback) {
//     let sqlCommande = `SELECT c.name_of_creation, u.first_name ,u.last_name, u.mail, u.phone, m.body, m.send_time 
//         FROM creations c JOIN messages m ON c.id=m.creation_id
//         JOIN users u ON u.id= m.customer_id
//         WHERE c.seller_id=${req.params.body} `;
//     db.query(sqlCommande, callback);
// }

async function getAllMyMessages(req, callback){
    let sqlCommande = `SELECT  c.name_of_creation, m.send_time, u.first_name, u.last_name, u.mail, m.customer_bid, sm.stutus FROM messages m JOIN creations c ON m.creation_id=c.id JOIN users u ON m.customer_id=u.id JOIN stutus_messages sm ON m.stutus=sm.id WHERE m.seller_id=${req.params.userId}`;
    db.query(sqlCommande, callback);
}

async function getAllMyMessagesISent(req, callback){
    let sqlCommande = `SELECT m.message_id, c.name_of_creation, m.send_time, u.first_name, u.last_name, m.customer_bid, sm.stutus FROM messages m JOIN creations c ON m.creation_id=c.id JOIN users u ON m.customer_id=u.id JOIN stutus_messages sm ON m.stutus=sm.id WHERE m.customer_id=${req.params.userId}`;
    db.query(sqlCommande, callback);
}

async function deleteMessage(req,callback){
    let sqlCommande = `DELETE FROM messages WHERE message_id=${req.params.messageId}`;
    db.query(sqlCommande, callback);
 }

async function getDetails(req, callback){
    let sqlCommande=`SELECT first_name, last_name ,mail, phone, password FROM users WHERE users.id='${req.params.userId}'`;
    db.query(sqlCommande, callback)
}

async function sendMessage(req, callback){
    let sqlCommande = `INSERT INTO messages (creation_id, seller_id, customer_id, send_time, stutus, customer_bid) VALUES ('${req.params.creationId}',${req.body.seller_id}, '${req.params.userId}', CURTIME(), 1, '${req.body.creationBid}' )`;
    db.query(sqlCommande, callback);
}

 async function updatingDetails(req,callback){
    let sqlCommande = `UPDATE users SET first_name='${req.body.firstName}', last_name='${req.body.lastName}', phone='${req.body.phone}' WHERE users.id=${req.params.userId} `;
    db.query(sqlCommande, callback);
 }

 async function allMyCreations(req,callback){
    let sqlCommande = `SELECT * FROM creations WHERE seller_id=${req.params.userId} `;
    db.query(sqlCommande, callback);
 }

 async function newCreatoin(req,callback){
    let sqlCommande = `INSERT INTO creations (seller_id, upload_date, name_of_creation, descript_of_creation, price,  creation_type) VALUES ('(SELECT id FROM users WHERE id=${req.params.userId})', 'SELECTCURDATE()','${req.body.name_of_creation}','${req.body.descript_of_creation}', '${req.body.price}', '${req.body.creation_type}')`;
    db.query(sqlCommande, callback);
 }

 async function deleteCreation(req,callback){
    let sqlCommande = `DELETE FROM creations WHERE seller_id=${req.params.userId} AND id=${req.params.creationId}`;
    db.query(sqlCommande, callback);
 }

 async function getStutusMessage(req,callback){
    let sqlCommande = `SELECT stutus FROM messages WHERE seller_id=${req.params.userId} AND message_id=${req.params.messageId}`;
    db.query(sqlCommande, callback);
 }

 async function getCreationsByPrice(req,callback){
    let sqlCommande = `select * FROM creations where price BETWEEN ${req.params.StartByPrice} and ${req.params.endByPrice};`;
    db.query(sqlCommande, callback);
 }

 async function getCreationsByType(req,callback){
    let sqlCommande = `select * FROM creations where creation_type=${req.params.ntype};`;
    db.query(sqlCommande, callback);
 }

 async function getCreationTypes(req,callback){
    let sqlCommande = `select * FROM creation_types`;
    db.query(sqlCommande, callback);
 }

 async function getAllStatus(req,callback){
    let sqlCommande = `select * FROM stutus_messages`;
    db.query(sqlCommande, callback);
 }
 
module.exports = {
    getAllCreations,
    logIn,
    getUserTypes,
    getCreationDetails,
    signUp,
    getUserType,
    getAllMyMessages,
    getDetails,
    addNewCreation,
    sendMessage,
    updatingDetails,
    allMyCreations,
    newCreatoin, 
    deleteCreation,
    getStutusMessage,
    getCreationsByPrice,
    getCreationsByType,
    getCreationTypes,
    getAllMyMessagesISent,
    getAllStatus,
    deleteMessage
} 