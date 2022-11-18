import { useForm } from "react-hook-form";
import styles from "../styles/cadastroLogin.module.css";

interface registerForm {
    username: string,
    password: string
}
function checkPassword(password: string) {
    const regexVerifyUpperCharinPassword = /[A-Z]/g;
    const regexVerifyNumberinPassword = /[0-9]/g;
    return regexVerifyUpperCharinPassword.test(password) && regexVerifyNumberinPassword;
}
function Cadastro() {
    const {register, handleSubmit} = useForm<registerForm>();

    async function submit(data: registerForm) {
        if (data.username.length >= 3 && data.password.length >= 8) {
            
            if (checkPassword(data.password)) {
                const req = await fetch("/api/users/registerUsers", {
                    method: "POST",
                    body: JSON.stringify({username: data.username, password: data.password}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                try {
                    const res = await req.json();
                } catch {
                    alert("O Username digitado já está sendo utilizado");
                }
            }
            else {
                alert("Você deve informar uma senha com, no mínimo, um número e uma letra maiúscula");
            }
        }
        else {
            alert("Você deve informar uma senha de, no mínimo, 8 caracteres");
        }
    }

    return (
        <div className="container">
            <h1>Cadastro</h1>
            <form className={styles.SessionForm} onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="username">Username</label><br />
                    <input type="text" {...register("username", {required: true})} required/>
                </div>

                <div>
                    <label htmlFor="password">Senha</label><br />
                    <input type="password" {...register("password", {required: true})} required/>

                    <span>*A Senha deve conter pelo menos 8 caracteres, um número e uma letra maiúscula</span>
                </div>

                <button>Cadastrar</button>
            </form>
        </div>
    );
}
export default Cadastro;