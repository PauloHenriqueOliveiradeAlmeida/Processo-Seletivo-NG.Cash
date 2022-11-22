import styles from "../styles/dashboard.module.css";
import nookies from "nookies";
import { verify } from "jsonwebtoken";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { searchUsersDB } from "./api/db/users";
import { searchAccountsDB } from "./api/db/accounts";
import { searchTransactionsDB } from "./api/db/transactions";

interface serverProps {
    balance: number,
    transactions: string[] | number[] | any,
    accountId: number,
    username: string
}

interface TransactionForm {
    username: string,
    transactionValue: number
}

interface Transactiondatas {
    createdAt: string,
    creditedAccount: string,
    debitedAccount: string,
    value: number
}

function formatDate(date: string) {
    const [year, month, day] = date.substring(0, 10).split("-");
    return `${day}/${month}/${year}`;
}

function Dashboard({balance, transactions, accountId, username}: serverProps) {
    const {register, handleSubmit} = useForm<TransactionForm>();
    const [transfers, setTransfers] = useState<JSX.Element[]>();

    useEffect(() => {
        let transfers: JSX.Element[] = [];

        console.log(transactions);
        
        if (transactions.length == 0) {

        }

        else {
            transactions.slice(0, 8).forEach((data: Transactiondatas, index: number) => {
                const date = formatDate(data.createdAt);

                transfers.push(
                    <div key={`div${index}`} className={styles.transactionCard}>
                        <p key={`date${index}`}>{date}</p>
                        <p key={`username${index}`}>
                            {
                            data.creditedAccount === username ? data.debitedAccount : data.creditedAccount
                            }
                        </p>
                        <p key={`value${index}`}>
                            {
                                data.creditedAccount === username ?
                                `+ ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}` :
                                `- ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
                            }
                        </p>
                    </div>
                );

            });
            setTransfers(transfers);
        }
    }, [transactions, username]);

    async function makeTransaction(data: TransactionForm) {
        const req = await fetch("/api/transactions/newTransaction", {
            method: "POST",
            body: JSON.stringify({
                id: accountId,
                usernameReceives: data.username,
                value: data.transactionValue
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return (
        <div className={`container ${styles.fullPage}`}>
            <div className={styles.dashboard}>
                <main>

                    <h1>{balance.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</h1>
                    <form className={styles.cashOutForm} onSubmit={handleSubmit(makeTransaction)}>
                        <h2>realizar Pagamento</h2>

                        <div className={styles.fieldsContainer}>
                            <div><label htmlFor="username">@</label></div>
                            <input type="text" id="username" placeholder="Username" {...register("username", {required: true})} required/>
                        </div><br />
                        
                        <div className={styles.fieldsContainer}>
                            <label htmlFor="transactionValue">R$</label>
                            <input type="number" id="transactionValue" placeholder="Valor do Pagamento" {...register("transactionValue", {required: true})} min="0.01" step="0.01" required/>
                        </div><br />
                        
                        <button type="submit">Transferir</button>
                    </form>

                    <FontAwesomeIcon icon={faRightFromBracket} className={styles.logOutButton}/>
                </main>
                <aside className={styles.transfersAside}>
                    <h2>Transferências Recentes</h2>
                    <div>
                        {transfers}
                    </div>
                </aside>
            </div>
        </div>
        
    );

}

export async function getServerSideProps(ctx: NextPageContext) {
    // try {
        const token = nookies.get(ctx);

        const id: any = verify(token.next_auth_token, process.env.JWT_SECRET);

        const accountId = await searchUsersDB(undefined, id.id);
        

        const accountDatas = await searchAccountsDB(accountId[0].accountId);

        const transactions = await searchTransactionsDB(accountDatas[0].id);
    
            
        const transactionsInfo: Array<Transactiondatas> = [];

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
            props: {
                balance: accountDatas[0].balance,
                transactions: transactionsInfo,
                accountId: accountId[0].accountId,
                username: accountId[0].username
            }
        }
    // }
    // catch {
    //     return {
    //         redirect: {
    //             permanent: false,
    //             destination: "/",
    //           }
    //     }
    // }
}

export default Dashboard;