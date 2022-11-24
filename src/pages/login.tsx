import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/context";
import styles from "../styles/cadastroLogin.module.css";

interface registerForm {
    username: string,
    password: string
}

function Login() {
    const {register, handleSubmit} = useForm<registerForm>();
	const { signIn } = useContext(AuthContext);

    async function submit(data: registerForm) {
		const req = await signIn({username: data.username, password: data.password});
	}
        
    return (
        <div className="container">
            <h1>Login</h1>
            <form className={styles.SessionForm} onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="username">Username</label><br />
                    <input type="text" {...register("username", {required: true})} required/>
                </div>

                <div>
                    <label htmlFor="password">Senha</label><br />
                    <input type="password" {...register("password", {required: true})} required/>    
                </div>

            	<button>Cadastrar</button>
            </form>
            <Link href="/cadastro" className="link">Não tem conta? Crie Agora</Link>
        </div>
    );
}
export default Login;