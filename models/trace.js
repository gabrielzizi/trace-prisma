'use strict';
const { PrismaClient, status_transaction } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class Trace {
    trace = async (transactionId, body, status, name) => {
        await prisma.$connect();
        try {
            await prisma.trace.create({
                data: {
                    name: name,
                    body: body,
                    status: status,
                    transaction: {
                        connect: {id: transactionId}
                    }
                },
            })
        } catch (error) {
             console.log(error)
        }
    }
}