import Image from "next/image"
import Link from "next/link"
import styles from "../styles/index.module.css"
export default function Home() {
  return (
	<main className={styles.mainContainer}>
		<div className={styles.textContainer}>
			<div className={styles.title}>
				<h1>Banking NG.Cash</h1>
				<p>Processo <span>Seletivo</span></p>
			</div>
			<div className={styles.body}>
				<p>Banking desenvolvido para o processo Seletivo NG.Cash</p>
				<Link href="/cadastro" className={`button ${styles.button}`}>Criar Conta</Link>
				<Link href="/login" className="link">Já tem Conta? faça Login</Link>
			</div>
		</div>
		<div className={styles.logoContainer}>
			<figure>
				<Image src="/ngcashLogo.svg" alt="NG.Cash Logotipo" fill/>
			</figure>
		</div>
    </main>
  )
}
