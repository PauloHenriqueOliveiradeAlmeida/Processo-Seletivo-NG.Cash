import { NextApiRequest, NextApiResponse } from "next";
import { updateBalanceAccount } from "../db/accounts";
import { registerTransactionsDB } from "../db/transactions";
import { searchUsersDB } from "../db/users";

export default async function newTransaction(req: NextApiRequest, res: NextApiResponse) {
    const {id, usernameReceives, value} = req.body;

    const creditedAccount = await searchUsersDB(usernameReceives);
    const newTransaction = await registerTransactionsDB(id, creditedAccount[0].accountId, parseFloat(value));

    const updateBalances = await updateBalanceAccount(creditedAccount[0].accountId, id, parseFloat(value));
    return res.json({
        transaction: newTransaction,
        balances: updateBalances
    });
}