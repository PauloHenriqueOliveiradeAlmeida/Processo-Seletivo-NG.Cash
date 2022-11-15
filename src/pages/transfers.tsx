import styles from "../styles/transfers.module.css";

function Transfers() {
    
    return (
        <div className="container">

            <div className={styles.transfersContainer}>
                <main>
                    <form className={styles.filters}>
                        <label htmlFor="dateTransactionFilter">Data de Transação:</label>
                        <input type="date" id="dateTransactionFilter" />

                        <div className={styles.radioFilters}>
                            <div>
                                <label htmlFor="cashInFilter">Cash-In</label><br />
                                <input type="radio" name="cashRadioFilter" id="cashInFilter" />
                            </div>

                            <div>
                                <label htmlFor="cashOutFilter">Cash-Out</label><br />
                                <input type="radio" name="cashRadioFilter" id="cashOutFilter" />
                            </div>
                        </div>
                        <button>Buscar</button>
                    </form>
                    <table className={styles.transfersTable}>
                        <tbody>
                            <tr className={styles.tableHeaders}>
                                <th>Data</th>
                                <th>Username</th>
                                <th>Valor</th>
                            </tr>
                            <tr className={styles.tableContent}>
                                <td>ass</td>
                                <td>assa</td>
                                <td>ass</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );

}

export default Transfers;