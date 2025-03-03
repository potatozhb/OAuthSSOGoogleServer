const app = require("./app");

const {getAllUsers, getUser, addUser, updateUser} = require("./database/mysql")

const port = 5000;
app.listen(port, () => {
  //updateUser("100086762642868048148", "new data", "new data");
  console.log(`Listening: http://localhost:${port}`);
});
