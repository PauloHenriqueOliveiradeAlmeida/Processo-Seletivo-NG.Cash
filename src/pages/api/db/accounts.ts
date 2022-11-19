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