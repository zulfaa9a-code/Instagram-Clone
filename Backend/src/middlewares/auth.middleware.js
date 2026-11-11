const jwt=require('jsonwebtoken')

async function identifyUser(req,res,next)
{
    console.log(req.body, req.file)
   const token= req.cookies.token
    if(!token)
    {
        return res.status(401).json({
            message:"Unauthorized access",
        })
    }
    let decoded;
    try
    {decoded= jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err)
    {
        return res.status(401).json({
            message:"User unauthorized"
        })
    }
    req.user=decoded
    next()
}
module.exports= identifyUser
