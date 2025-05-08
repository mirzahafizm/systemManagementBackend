const { PrismaClient } = require('@prisma/client')
const { decodeJWT } = require('./jwt')
const prisma = new PrismaClient()

const getUser = async (req) => {
    if(!req.headers.authorization) throw new RangeError('401-Unauthorized')
    const token = String(req.headers.authorization).replace(/Bearer /, '')
    const email = await decodeJWT(token)
    const user = await prisma.user.findUnique({where:{email}})

    if(!user) throw new RangeError('401-Unauthorized')
    return user;    
}

function auth(...allowedRoles) {
    return async function authMid(req,res,next){
        try {
            const user = await getUser(req);
            if(!allowedRoles.includes(user.role)){
                throw new RangeError('403-Forbidden')
            }
            res.locals.auth = user.email;
            res.locals.authId = user.id;
            res.locals.role = user.role;
            next();
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {getUser, auth}