





const express = require("express");
const mysql= require("mysql");
const app = express();
app.use(express.json());


const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"LoginSyatem",
});




app.post('./register',(req,res)=>{
const username=req.body.username;
const password=req.body.password;


    db.query("INSERT INTO USERS(username,password)VALUES(?,?)",
    [username,password],
    (err,result)=>{
        console.log(err);
    }
    );

});

app.post('/Login',(req,res)=>{
    const username=req.body.username;
const password=req.body.password;


    db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username,password],
    (err,result)=>{

        if(err){
            res.send({err:err})
        }
        
            if(result.length>0){
                res.send(result);
            }else{
                res.send({message:"wrong username/password combination!"});
            

        }
    
    }
    );

});






app.Listen(3001,()=>{
    console.log("running server");
});