'use strict';
const { PrismaClient, status_transaction } = require("@prisma/client");
const Trace = require("./trace");
const prisma = new PrismaClient();
const traceModel = new Trace()

var ms = 1500;

module.exports = class Transaction {
    constructor(jobid) {
        this.jobid = jobid || null;
    }

    start = async (name) => {
        await prisma.$connect();
        try {
            createTransaction(name, this.jobid)
        } catch (error) {
             console.log(error)
        }
    }

    success = async (name) => {
        try {
            await sleep(ms)
            updateTransaction(name, status_transaction.success)
        } catch (error) {
            console.log(error)
        }
    }

    error = async (name) => {
        try {
            await sleep(ms)
            updateTransaction(name, status_transaction.error)
        } catch (error) {
            console.log(error)
        }
    }

    rejected = async (name) => {
        try {
            await sleep(ms)
            updateTransaction(name, status_transaction.rejected)
        } catch (error) {
            console.log(error)
        }
    }

    alert = async (name) => {
        try {
            await sleep(ms)
            updateTransaction(name, status_transaction.alert)
        } catch (error) {
            console.log(error)
        }
    }

    trace = async (transactionName, body, status, nameTrace) => {
        try {
            await sleep(ms)
            const idTransaction = await getIdByName(transactionName)
            await traceModel.trace(idTransaction, body, status, nameTrace)
        } catch (error) {
            console.log(error)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

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
                    connect: {id: jobID}
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

async function getIdByName(name) {
    const query = await prisma.transaction.findMany({
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

    return query[0].id
}