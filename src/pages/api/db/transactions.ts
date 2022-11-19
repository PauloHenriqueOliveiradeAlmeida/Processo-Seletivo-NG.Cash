import { prisma } from "./db";
export async function searchTransactionsDB(id: number) {
    return prisma.public_Transactions.findMany({
        where: {
            OR: [
                {creditedAccount: id},
                {debitedAccount: id}
            ]
        }
    });
}