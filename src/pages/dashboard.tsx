import styles from "../styles/dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function Dashboard() {
    
    return (
        <div className={`container ${styles.fullPage}`}>
            <div className={styles.dashboard}>
                <main>

                    <h1>R$ 00,00</h1>

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
                        <p>00/00/0000</p>
                        <p>Nome pessoa</p>
                        <p>R$ 00,00</p>
                    </div>
                </aside>
            </div>
        </div>
        
    );

}
export default Dashboard;