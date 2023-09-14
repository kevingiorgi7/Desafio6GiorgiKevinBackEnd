// SESSION
import {Router} from "express";
import {userModel} from "../db/models/users.model.js"

const router = Router()

router.post('/register',async(req,res)=>{
    try {
        const result = await userModel.create(req.body);
        console.log(req.body);
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
            email: user.email
        }
        res.sendStatus(200);
    } catch (error) {
        throw res.status(500).json({
            error,
        });
    }
})

export default router