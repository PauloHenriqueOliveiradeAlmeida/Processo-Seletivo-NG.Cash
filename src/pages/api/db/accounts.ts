import { prisma } from "./db";

export async function registerAccountsDB() {
    return prisma.public_Accounts.create({
        data: {
            balance: 100.00
        }
    })
}
