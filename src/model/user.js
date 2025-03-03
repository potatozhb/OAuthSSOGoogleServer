

class User {
    constructor(id, username, email, password) {
      this.googleId = id;
      this.fullname = username;
      this.email = email;
    }
  
    // Method to check password (simplified, in a real-world case you should hash passwords)
    static isValidPassword(inputPassword, storedPassword) {
      return inputPassword === storedPassword;
    }
}

module.exports = User;
