const hbs= require("hbs")
require("dotenv").config({
    path:'.env'
})
require("colors")
const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const path = require("path");
const { ConnectDB } = require("./db/db.config");
const cookieParser = require('cookie-parser')
const app = express()
const jwt = require("jsonwebtoken")
const jwt_auth = process.env.JWT_AUTH ||"^&*()%^&*()"

app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,'views','partials'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser("#$%^&*(#$%^&*("))
const port = process.env.PORT || 5000;

const userModel = require("./models/user.models")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
ConnectDB()


const privateUser = (req,res,next)=>{
        // res.cookie('token','sdadsa',{
        //     maxAge: 900000, // Cookie expiration in milliseconds
        //     httpOnly: true,  // Helps prevent XSS attacks
        //     secure: false,   // Set to true if using HTTPS
        // })
        
        try {
            const cookie = req?.cookies['token'] || ''
                if(!cookie){
                    throw new Error("Please Login First")
                    return
                }
            const verify = jwt.verify(cookie,jwt_auth);
            req.user = verify.userId

                

                next()

        } catch (error) {
            console.log(error);
            res.clearCookie('token', { path: '/' });
            res.redirect("login?error="+error.message);
        }

}

app.get("/",privateUser,async(req,res)=>{


            const user = await userModel.findById(req.user);


    res.render("index.hbs",{
        title:"Home Page",
        isLogged:true,
        user
    });
})


app.route("/login")
.get((req,res)=>{
     

    res.render("login.hbs",{
        title:"Login Page",
        error:req.query.error,
        success:req.query.success
    });
})
.post(async(req,res)=>{
    try {
                
        const {  email,password} = req.body;
            if( !email || !password){
                    throw new Error("Plese Fill All Details")
                    return
            }
                const chk_user = await userModel.findOne({email:email.toLowerCase()})

                if(!chk_user){
                    throw new Error("User Not Found In Our Database");
                }


                const isMatch = await chk_user.comparePassword(password)


                if(!isMatch){
                    throw new Error("Invalid Credentials");
                }
                const token = jwt.sign({userId:chk_user._id},jwt_auth,{
                    expiresIn:'20d'
                })
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:true,
                    maxAge: new Date(Date.now() + 900000),
                })

            res.redirect("/");
        } catch (error) {
res.redirect("login?error="+error.message);
            
        }
})

app.route("/register")
.get((req,res)=>{
    res.render("register.hbs",{
        title:"Register Page",
        error:req.query.error,
        success:req.query.success
    });
})
.post(async(req,res)=>{
            try {
                
            const { name,email,password} = req.body;
                if(!name || !email || !password){
                        throw new Error("Plese Fill All Details")
                        return
                }

                const chk_user = await userModel.findOne({email:email.toLowerCase()})

                if(chk_user){
                    throw new Error("User Already Exist");
                }


                    await userModel.create({
                        name,email,password
                    })
            

    res.redirect("register?success=User Register Successfully");
            } catch (error) {
    res.redirect("register?error="+error.message);
                
            }
})

app.get("/logout",(req,res)=>{
    res.clearCookie("token",{path:'/'})
    res.redirect("/login?success=Logout Success !")
})

app.listen(port,()=>{
    console.log(`the app is listn at http://localhost:${port}`.bgGreen.blue.underline);
    
})