import { NextPageContext } from "next";
import styles from "../styles/transfers.module.css";
import getTransactions from "./api/transactions/getTransactions";
import nookies from "nookies";
import { ChangeEvent, useEffect, useState } from "react";
import { verify } from "jsonwebtoken";

interface serverProps {
    balance: number,
    transactions: Array<TransactionDatas>,
    accountId: number,
    username: string
}
interface TransactionDatas {
    createdAt: string,
    creditedAccount: string,
    debitedAccount: string,
    value: number
}



function Transfers({transactions, username}: serverProps) {
    const [transfers, setTransfers] = useState<Array<JSX.Element> | JSX.Element>()

    function formatDate(date: string, ISODate: boolean = false) {
        const [year, month, day] = date.substring(0, 10).split("-");
        const dateString = !ISODate ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
        return dateString;
    }

    function showTransactionsWithoutFilter() {
        let transfers: JSX.Element[] = [];
        
        if (transactions.length == 0) {
            setTransfers(
                <tr className={styles.transactionCard}>
                    <td colSpan={3}>Ainda não há nenhuma transação realizada</td>
                </tr>
            );
        }

        else {
            transactions.forEach((data, index: number) => {
                const date = formatDate(data.createdAt);

                transfers.push(
                    <tr key={`tr${index}`} className={styles.transactionCard}>
                        <td key={`date${index}`}>{date}</td>
                        <td key={`username${index}`}>
                            {
                            data.creditedAccount === username ? data.debitedAccount : data.creditedAccount
                            }
                        </td>
                        <td key={`value${index}`} className={data.debitedAccount === username ? styles.debitedValue : styles.creditedValue}>
                            {
                                data.creditedAccount === username ?
                                `+ ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}` :
                                `- ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
                            }
                        </td>
                    </tr>
                );

            });
            setTransfers(transfers);
        }
    }

    function filterTransactionsWithDate(event: ChangeEvent<HTMLInputElement>) {
        let transfers: JSX.Element[] = [];
        transactions.forEach((data, index) => {
            const date = formatDate(data.createdAt, true);
            if (date === event.target.value) {
                const [year, month, day]  = date.split("-");
                transfers.push(
                    <tr key={`tr${index}`} className={styles.transactionCard}>
                        <td key={`date${index}`}>{`${day}/${month}/${year}`}</td>
                        <td key={`username${index}`}>
                            {
                            data.creditedAccount === username ? data.debitedAccount : data.creditedAccount
                            }
                        </td>
                        <td key={`value${index}`} className={data.debitedAccount === username ? styles.debitedValue : styles.creditedValue}>
                            {
                                data.creditedAccount === username ?
                                `+ ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}` :
                                `- ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
                            }
                        </td>
                    </tr>
                );
            }
        });
        setTransfers(transfers);
    }

    function filterTransactionsWithCashIn() {
        let transfers: JSX.Element[] = [];
        transactions.forEach((data, index) => {
            if (data.creditedAccount === username) {
                const date = formatDate(data.createdAt);
                transfers.push(
                    <tr key={`tr${index}`} className={styles.transactionCard}>
                        <td key={`date${index}`}>{date}</td>
                        <td key={`username${index}`}>{data.debitedAccount}</td>
                        <td key={`value${index}`} className={styles.creditedValue}>+ {data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                    </tr>
                );
            }
        });
        setTransfers(transfers);
    }

    function filterTransactionWithCashOut() {
        let transfers: JSX.Element[] = [];
        transactions.forEach((data, index) => {
            if (data.debitedAccount === username) {
                const date = formatDate(data.createdAt);
                transfers.push(
                    <tr key={`tr${index}`} className={styles.transactionCard}>
                        <td key={`date${index}`}>{date}</td>
                        <td key={`username${index}`}>{data.creditedAccount}</td>
                        <td key={`value${index}`} className={styles.debitedValue}>- {data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                    </tr>
                );
            }
        });
        setTransfers(transfers);
    }

    useEffect(() => {
        let transfers: JSX.Element[] = [];
        
        if (transactions.length == 0) {
            setTransfers(
                <tr className={styles.transactionCard}>
                    <td colSpan={3}>Ainda não há nenhuma transação realizada</td>
                </tr>
            );
        }

        else {
            transactions.forEach((data, index: number) => {
                const date = formatDate(data.createdAt);

                transfers.push(
                    <tr key={`tr${index}`} className={styles.transactionCard}>
                        <td key={`date${index}`}>{date}</td>
                        <td key={`username${index}`}>
                            {
                            data.creditedAccount === username ? data.debitedAccount : data.creditedAccount
                            }
                        </td>
                        <td key={`value${index}`} className={data.debitedAccount === username ? styles.debitedValue : styles.creditedValue}>
                            {
                                data.creditedAccount === username ?
                                `+ ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}` :
                                `- ${data.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
                            }
                        </td>
                    </tr>
                );

            });
            setTransfers(transfers);
        }
    }, [transactions, username]);
    
    return (
        <div className="container">

            <div className={styles.transfersContainer}>
                <main>
                    <div className={styles.filters}>
                        <label htmlFor="dateTransactionFilter">Data de Transação:</label>
                        <input type="date" id="dateTransactionFilter" onChange={(e) => {filterTransactionsWithDate(e)}}/>

                        <div className={styles.radioFilters}>
                            <div>
                                <label htmlFor="cashInFilter">Cash-In</label><br />
                                <input type="radio" name="cashRadioFilter" id="cashInFilter" onClick={() => {filterTransactionsWithCashIn()}}/>
                            </div>

                            <div>
                                <label htmlFor="cashOutFilter">Cash-Out</label><br />
                                <input type="radio" name="cashRadioFilter" id="cashOutFilter" onClick={() => {filterTransactionWithCashOut()}}/>
                            </div>
                        </div>
                        <button className={styles.clearFiltersButton} onClick={() => {showTransactionsWithoutFilter()}}>Limpar Filtros</button>
                    </div>
                    <table className={styles.transfersTable}>
                        <tbody>
                            <tr className={styles.tableHeaders}>
                                <th>Data</th>
                                <th>Username</th>
                                <th>Valor</th>
                            </tr>
                            {transfers}
                        </tbody>
                    </table>
                </main>
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
                transactions: transactionsInfo.transactionsInfo,
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


export default Transfers;