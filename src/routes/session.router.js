// SESSION
import {Router} from "express";
import {userModel} from "../db/models/users.model.js"

const router = Router()

router.post('/register',async(req,res)=>{
    try {
        const {first_name, last_name, email, age, password} = req.body
        const newUser = req.body
        console.log(newUser);
        if(email==="adminCoder@coder.com") {
            newUser.isAdmin = true
        }
        console.log(newUser);
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).send({status:"error",error:`El E-Mail ${email} ya está registrado`})
        }
        const result = await userModel.create(newUser);
        console.log(result);
        res.send({status:"success",payload:result})
    } catch (error) {
        throw res.status(500).json({
            error,
        });
    }

})

router.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email,password})
        //Corroborar si existe
        if(!user) return res.status(400).send({status:"error", error:"Usuario o contaseña incorrecta"});
        // Si existe, crea una SESSION
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            admin: user.isAdmin
        }
        res.send({status:"success",payload: req.res.user, message:"Logueado"})
    } catch (error) {
        throw res.status(500).json({
            error,
        });
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send({status:"error",error:"No pudo cerrar sesion"})
        res.redirect('/api/views/login')
    })
})

export default router