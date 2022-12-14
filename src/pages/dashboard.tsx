import styles from "../styles/dashboard.module.css";
import nookies from "nookies";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import Router from "next/router";
import getTransactions from "./api/transactions/getTransactions";
import { verify } from "jsonwebtoken";

interface serverProps {
    balance: number,
    transactions: Array<TransactionDatas>,
    accountId: number,
    username: string
}

interface TransactionForm {
    username: string,
    transactionValue: number
}

interface TransactionDatas {
    createdAt: string,
    creditedAccount: string,
    debitedAccount: string,
    value: number
}





function Dashboard({balance, transactions, accountId, username}: serverProps) {
    const {register, handleSubmit} = useForm<TransactionForm>();
    const [transfers, setTransfers] = useState<JSX.Element[] | JSX.Element>();

    const logOut = () => {
        nookies.destroy(null, "next_auth_token");
        Router.push("/");
    }
    
    function formatDate(date: string) {
        const [year, month, day] = date.substring(0, 10).split("-");
        return `${day}/${month}/${year}`;
    }

    async function makeTransaction(data: TransactionForm) {
        if (data.username != username) {
            if (data.transactionValue <= balance) {
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

                const res = await req.json();

                if (res.error === "user not found") {
                    alert("Usu??rio n??o encontrado, tente novamente com outro username");
                }
                else {
                    Router.reload();
                }
                
            }
            else {
                alert("O valor digitado excede seu balan??o, tente com um valor menor");
            }
        }
        else {
            alert("Infelizmente n??o ?? poss??vel transferir dinheiro para si mesmo, tente com outro username");
        }
    }

    useEffect(() => {
        let transfers: JSX.Element[] = [];
        
        if (transactions.length == 0) {
            setTransfers(
                <div className={styles.transactionCard}>
                    <p>Ainda n??o h?? nenhuma transa????o realizada</p>
                </div>
            );
        }

        else {
            transactions.slice(0, 8).forEach((data, index: number) => {
                const date = formatDate(data.createdAt);

                transfers.push(
                    <div key={`div${index}`} className={styles.transactionCard}>
                        <p key={`date${index}`}>{date}</p>
                        <p key={`username${index}`}>
                            {
                            data.creditedAccount === username ? data.debitedAccount : data.creditedAccount
                            }
                        </p>
                        <p key={`value${index}`} className={data.debitedAccount === username ? styles.debitedValue : styles.creditedValue}>
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

                    <FontAwesomeIcon icon={faRightFromBracket} className={styles.logOutButton} onClick={logOut}/>
                </main>
                <aside className={styles.transfersAside} onClick={() => {Router.push("/transfers")}}>
                    <h2>Transfer??ncias Recentes</h2>
                    <div>
                        {transfers}
                    </div>
                </aside>
            </div>
        </div>
        
    );

}

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const token = nookies.get(ctx);
        const id = verify(token.next_auth_token, process.env.JWT_SECRET);
        const transactionsInfo = await getTransactions(id);

        return {
            props: {
                balance: transactionsInfo.balance,
                transactions: transactionsInfo.transactionsInfo,
                accountId: transactionsInfo.id,
                username: transactionsInfo.username
            }
        }
    }
    catch {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    
}

export default Dashboard;