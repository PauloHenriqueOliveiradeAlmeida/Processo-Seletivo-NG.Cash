import styles from "./SessionForm.module.css";

function SessionForm(props:{loginOrRegistration: string}) {
    return (
        <div className={styles.container}>
            <h1>{props.loginOrRegistration}</h1>
            <form className={styles.SessionForm}>
                <div>
                    <label htmlFor="username">Username</label><br />
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="password">Senha</label><br />
                    <input type="password" />
                </div>

                <button>
                    {props.loginOrRegistration === "Cadastro" ? "Cadastrar" : "Fazer Login"}
                </button>
            </form>
        </div>
    );
}
export default SessionForm;