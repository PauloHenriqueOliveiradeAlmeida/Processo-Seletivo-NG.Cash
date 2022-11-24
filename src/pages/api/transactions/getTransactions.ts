import { verify } from "jsonwebtoken";
import { searchAccountsDB } from "../db/accounts";
import { searchTransactionsDB } from "../db/transactions";
import { searchUsersDB } from "../db/users";


interface TransactionDatas {
    createdAt: string,
    creditedAccount: string,
    debitedAccount: string,
    value: number
}

export default async function getTransactions(token: { [next_auth_token: string]: string; }) {
    const id: any = verify(token.next_auth_token, process.env.JWT_SECRET);
    const accountId = await searchUsersDB(undefined, id.id);
    
    const accountDatas = await searchAccountsDB(accountId[0].accountId);
    const transactions = await searchTransactionsDB(accountDatas[0].id);

        
    const transactionsInfo: Array<TransactionDatas> = [];
    const debitsInformations = [];
    const creditsInformations = [];
    const debitsUsername: string[] = [];
    const creditsUsername: string[] = [];
    for await (const data of transactions) {
        debitsInformations.push(await searchUsersDB(undefined, undefined, data.debitedAccount));
        creditsInformations.push(await searchUsersDB(undefined, undefined, data.creditedAccount));
    }
    
    debitsInformations.forEach((data) => {
        debitsUsername.push(data[0].username);    
    });
    creditsInformations.forEach((data) => {
        creditsUsername.push(data[0].username);
    });
    transactions.forEach((data, index) => {
        transactionsInfo.push({
            debitedAccount: debitsUsername[index],
            creditedAccount: creditsUsername[index],
            createdAt: data.createdAt.toISOString(),
            value: data.value
        });
    });
    
    return {
        balance: accountDatas[0].balance,
        transactionsInfo,
        id: accountDatas[0].id,
        username: accountId[0].username
    };
}