const express = require('express')
const path = require('path');
const mysql2 = require('mysql2')
const app = express();

const database = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"prattbhai",
    database:"prattbro"
});
database.connect((error) => {
    if(error){
        
        return console.error(error)
    }
    console.log("Mysql database is connected....") 
})
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res) => {
    const heat = path.join(__dirname,'pro1.html');
    res.sendFile(heat)
})
app.post('/handleform',(req,res) => {
   try{
        const {name,email,password} = req.body;
        const SQL_COMMAND = "INSERT INTO usersdetails (name,email,password) VALUES (?,?,?)";
        database.query(SQL_COMMAND,[name,email,password],(err,result) => {
            if(err){
                console.error(err);
                return res.send("Registration unsuccessful")
            }
            console.log(result);
            res.send("Registration successful")
        })
   }
   catch(err){
    console.error(err);
    res.send("Registration Unsuccessful")
   }
})
app.listen(4000,() => {
    console.log("Server listening...")
})