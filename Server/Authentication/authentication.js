import auth from "../Firebase/configuration.js";
import express from "express";

const router = express.Router();

router.post("/sign-up" , async(req,res) => {
    try {
        console.log("sign-up request recieved")
        console.log(JSON.stringify(req.body))
        await auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
        await auth.updateProfile(auth.currentUser, {displayName: req.body.displayName, photoURL: req.body.photoURL});
        const token = auth.currentUser.getIdToken(true);
        res.json({toekn : token})
        //res.send({message : "User bien ajouté"});
    } catch (error) {
        res.send("error while signing in : " + error)
    }
})

router.post("/sign-in" , async(req,res) => {
    try {
        console.log("sign-in request recieved")
        await auth.signInWithEmailAndPassword(req.body.email, req.body.password);
        const token = await auth.currentUser.getIdToken(true);
        console.log(token);
        res.send({token : token})
        //res.send({user : "userCredential"});
    } catch (error) {
        res.send("error while signing in : " + error)
    }
})

export default router;