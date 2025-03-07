const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.NODE_ENV === "production" ? undefined : process.env.LOCAL_HOST,
    user: process.env.NODE_ENV === "production" ? process.env.GAE_DB_USER : process.env.DB_USER,
    password: process.env.NODE_ENV === "production" ? process.env.GAE_DB_PASSWORD : process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === "production" ? process.env.GAE_DB_DATABASE : process.env.DB_DATABASE,
    socketPath: process.env.NODE_ENV === "production" ? process.env.GAE_DB_SOCKET : undefined
}).promise();

module.exports.getAllUsers = async function(){
    const [rows] = await pool.query("select * from users");
    return rows;
}

module.exports.getUser = async function (id) {
    const [rows] = await pool.query(
        `select * 
        from users
        where googleId = ?`,
        [id]
    );
    
    console.log(rows[0]);
    return rows[0];    
}


module.exports.addUser = async function (id, fullname, email) {
    var user =await module.exports.getUser(id);
    if(user)
        return user;

    const result = await pool.query(
        `INSERT INTO users (googleId, fullname, email)
        VALUES (?,?,?)`,
        [id, fullname,email]
    );
    console.log(result);
    return result;    
}


module.exports.updateUser = async function (id, fullname, email) {
    const result = await pool.query(
        `UPDATE users 
         SET fullname=?, email=?
         WHERE googleId = ?`,
        [fullname,email, id]
    );
    console.log(result);
    return result;    
}