import { prisma } from "./db";
import { registerAccountsDB } from "./accounts";
export async function registerUsersDB(username: string, password: string) {
    const account = await registerAccountsDB();
    return prisma.public_Users.create({
        data: {
            username,
            password,
            accountId: account.id
        }
    })
}
