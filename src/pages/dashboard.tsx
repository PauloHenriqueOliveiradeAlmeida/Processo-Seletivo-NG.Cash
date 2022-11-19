import styles from "../styles/dashboard.module.css";
import nookies from "nookies";
import { verify } from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { searchUsersDB } from "./api/db/users";
import { searchAccountsDB } from "./api/db/accounts";
import { searchTransactionsDB } from "./api/db/transactions";

interface serverProps {
    balance: number,
    transactions: [],
    data: JSON
}

function Dashboard({balance, transactions}: serverProps) {
    const [transfers, setTransfers] = useState<JSX.Element>();

    useEffect(() => {
        if (transactions.length > 0) {

        }
        else {
            setTransfers(
                <p>
                    Ainda não há nenhuma transação para mostrar, <br/>
                    Primeiro faça uma transação
                </p>
            );
        }
    }, [transactions.length]);

    return (
        <div className={`container ${styles.fullPage}`}>
            <div className={styles.dashboard}>
                <main>

                    <h1>{balance.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</h1>
                    <form className={styles.cashOutForm}>
                        <h2>realizar Pagamento</h2>
                        <input type="number" placeholder="Valor do Pagamento" min="0.01" step="0.01"/><br />
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
    try {
        const token = nookies.get(ctx);

        const id = verify(token.next_auth_token, process.env.JWT_SECRET);

        const accountId = await searchUsersDB(undefined, id.id);
        

        const accountDatas = await searchAccountsDB(accountId[0].id);

        const transactions = await searchTransactionsDB(accountDatas[0].id);

        
        return {
            props: {
                balance: accountDatas[0].balance,
                transactions
            }
        }
    }
    catch {
        return {
            redirect: {
                permanent: false,
                destination: "/",
              }
        }
    }
}

export default Dashboard;