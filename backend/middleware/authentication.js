const jwt = require('jsonwebtoken')

const verify =(req,res,next)=>{
    const token =req.headers.authorization?.split(' ')[1]
    if(!token){
        return resizeBy.status(401).send({message:"unauthorized"})
    }
    const secretkey=process.env.secretkey
    jwt.verify(token,secretkey,(err,decoded)=>{
        if(err){
            return resizeBy.status(401).send({message:"unauthorized"})
        }
    req.user=decoded
    next()
    })
    
}
module.exports=verify