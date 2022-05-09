const express = require("express");
const app = express();
const port = 4040;
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    port :  5432,
    user : 'postgres',
    password : 'myPassword',
    database : 'qodbrains_db'
  }
});

app.use(express.json());

//get in touch endpoint
app.post("/contact", (req, res) => {

  const { name, surname, company_name, phone_number, email } = req.body;

 //validity empty fields 
  if(!name || !surname || !company_name || !phone_number || !email){
    return res.status(400).json("invalid form submission");
  }
 
  knex('users').insert({
    name,
    surname,
    company_name,
    phone_number,
    email
  }).then((response) => {
        res.status(201).send("Done");
      }).catch((err) => {
            res.status(500).send({
              error: "Internal Server Error",
              message: "Error adding user to the database",
            });
      });

  })


//listening on port
app.listen(process.env.PORT || port, (err) => {
    if(err){
        return `something went wrong ${err}.`;
    }else{
        return `server listen at port ${process.env.PORT}.`;
    };
});








