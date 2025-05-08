const { PrismaClient } = require("@prisma/client")
const bcrypt = require('bcrypt');
const response = require("../helper/response");
const { generateJWT } = require("../helper/jwt");

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
      const { name, password, email, role } = req.body;
      const hashed = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: { name, email, password: hashed, role },
      });
  
      user.id = user.id.toString();
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
  
      return response.Success(res, user);
    } catch (err) {
      return response.Error(res, err);
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await prisma.user.findUnique({where: {email}})

        const isPasswordTrue = await bcrypt.compare(password, user.password)
        if(!isPasswordTrue){
            return response.BadRequest(res, 'Wrong Password!')
        }

        const token = generateJWT(user.email)
        return response.Success(res, token)
    } catch (err) {
        return response.Error(res, err)
    }
}

const current = async (req, res) => {
    const user = await prisma.user.findFirst({where:{email: res.locals.auth}})

    user.id = user.id.toString();

    delete user.password
    return response.Success(res, user)
}
  

module.exports = {register, login, current}