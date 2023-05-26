const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateTransaction(name, status){
    try {
        const transactionAux = await prisma.transaction.findMany({
            where: {
                name: name
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: false
            }
        })
        await prisma.transaction.update({
            where: {
                id: transactionAux[0].id
            },
            data: {
                status: status,
                updatedAt: new Date()
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function createTransaction(name, jobID) {
    if (jobID) {
        await prisma.transaction.create({
            data: {
                name: name,
                updatedAt: new Date(),
                job: {
                    connect: {id: this.jobid}
                }
            },
        })
    } else {
        await prisma.transaction.create({
            data: {
                name: name,
                updatedAt: new Date()
            },
        })
    }
}

module.exports = {
    updateTransaction,
    createTransaction
}