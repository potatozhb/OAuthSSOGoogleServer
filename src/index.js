const app = require("./app");

//const {getAllUsers, getUser, addUser, updateUser} = require("./database/mysql")

const port = process.env.PORT || 5000;
console.log(`server port: ${port}, Node_ENV: ${process.env.NODE_ENV}:`);

app.listen(port, () => {
  //updateUser("100086762642868048148", "new data", "new data");
  if(process.env.NODE_ENV === "production"){
    console.log(`Listening: ${process.env.API_ADDRESS}:${port}`);
  }
  else{
    console.log(`Listening: http://localhost:${port}`);
  }
});
