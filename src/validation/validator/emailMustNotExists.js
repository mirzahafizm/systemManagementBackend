const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) return Promise.reject();

  return true;
};
