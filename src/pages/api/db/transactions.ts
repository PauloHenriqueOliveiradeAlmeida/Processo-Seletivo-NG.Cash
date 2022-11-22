import { prisma } from "./db";

export async function searchTransactionsDB(id: number) {
    return prisma.public_Transactions.findMany({
        select: {
            debitedAccount: true,
            creditedAccount: true,
            createdAt: true,
            value: true
        },
        where: {
            OR: [
                {debitedAccount: id},
                {creditedAccount: id}
            ]
        }
    });
}


export async function registerTransactionsDB(debitedAccount: number, creditedAccount: number, value: number) {
    return prisma.public_Transactions.create({
        data: {
            debitedAccount,
            creditedAccount,
            value,
            createdAt: new Date()
        }
    })
}