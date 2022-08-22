import React, { useState, useContext, FormEvent } from 'react';
import Image from 'next/image'
import LogoImg from '../../public/logo.jpeg'
import styles from '../styles/home.module.scss'
import { FiLock } from 'react-icons/fi'
import { FiMail } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Home() {
    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin( event: FormEvent) {
        event.preventDefault();

        if (email === '' || password === '') {
            toast.warning("Preecha os campos corretamente")
            return
        }

        let data = { 
            email,
            password
        }

        await signIn(data)
    }

  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <Image src={LogoImg} alt="logo image" className={styles.img} width={500} height={500} />
        </div>
        <div className={styles.formContainer}>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.login} >
                    <h2>Faça seu login</h2>
                    <div className={styles.wrapInput}>
                        <FiMail size={25} color="#000" />
                        <input 
                            type="text" 
                            placeholder='seu email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className={styles.wrapInput}>
                        <FiLock size={25} color="#000" />
                        <input 
                            type="password"
                            placeholder='sua senha' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button className={styles.loginButton} type="submit" >Acessar</button>
                </div>
                {/* <div className={styles.registry}>
                    <span className={styles.registryText}>Não tem um conta? <a className='RegistryButton' >Registre-se</a></span>
                </div> */}
            </form>
        </div>
    </div>
  )
}
