const Transaction = require('./transaction.js')
const transaction = new Transaction
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class job {
    constructor(name) {
        this.name = name
        var idJob;
        const getId = async (name) => {
            const query = await prisma.job.findFirst({
                where: {
                    name: name
                },
                select: {
                    id: true,
                    name: false
                }
            })

            idJob = query.id
            console.log(this)
        }

        getId(name)
    }

    transaction = transaction
}