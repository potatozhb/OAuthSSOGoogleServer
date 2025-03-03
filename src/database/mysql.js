const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();


module.exports.getAllUsers = async function(){
    const [rows] = await pool.query("select * from Users");
    return rows;
}

module.exports.getUser = async function (id) {
    const [rows] = await pool.query(
        `select * 
        from Users
        where googleId = ?`,
        [id]
    );
    
    console.log(rows[0]);
    return rows[0];    
}


module.exports.addUser = async function (id, fullname, email) {
    const result = await pool.query(
        `INSERT INTO Users (googleId, fullname, email)
        VALUES (?,?,?)`,
        [id, fullname,email]
    );
    console.log(result);
    return result;    
}


module.exports.updateUser = async function (id, fullname, email) {
    const result = await pool.query(
        `UPDATE Users 
         SET fullname=?, email=?
         WHERE googleId = ?`,
        [fullname,email, id]
    );
    console.log(result);
    return result;    
}