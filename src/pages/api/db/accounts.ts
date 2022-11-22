import { prisma } from "./db";

export async function registerAccountsDB() {
    return prisma.public_Accounts.create({
        data: {
            balance: 100.00
        }
    });
}

export async function searchAccountsDB(id: number) {
    return prisma.public_Accounts.findMany({
        where: {
            id
        }
    });
}

export async function updateBalanceAccount(creditedId: number, debitedId: number, value: number) {
    
    const creditedBalance = await searchAccountsDB(creditedId);
    const creditedAccount = await prisma.public_Accounts.update({
        where: {
            id: creditedId
        },
        data: {
            balance: creditedBalance[0].balance + value
        }
    })

    const debitedBalance = await searchAccountsDB(debitedId);
    const debitedAccount = await prisma.public_Accounts.update({
        where: {
            id: debitedId
        },
        data: {
            balance: debitedBalance[0].balance - value
        }
    });

    return {
        credited: creditedAccount,
        debited: debitedAccount
    }


} 