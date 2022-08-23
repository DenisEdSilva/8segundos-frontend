import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import { Header } from "../../../components/Header";
import styles from './styles.module.scss';
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { FiUpload } from "react-icons/fi";

export default function Category() {
	const [name, setName] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

		if (!e.target.files) {
			return;
		}

		const image = e.target.files[0];

		if (!image) {
			return;
		}

		if (image.type === 'image/jpeg' || image.type === 'image.png') {
			setImageAvatar(image)
			setAvatarUrl(URL.createObjectURL(e.target.files[0]))
		}

	}

	async function handleRegister(event: FormEvent) {
		event.preventDefault();

        try {

            const data = new FormData();

            if( name === '' || imageAvatar === null ) {
                toast.warning("Preencha todos os campos corretamente")
                return;
            } 

            data.append('name', name);
            data.append('file', imageAvatar)
    
            const apiClient = setupAPIClient();
            await apiClient.post('/categories', data)
    
            toast.success('Categoria criada com sucesso.')
            setName('');
            setImageAvatar(null);
            setAvatarUrl('')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao realizar o cadastro')
        }
	}

	return (
		<>
			<Head>
				<title>
					Nova Categoria - 8Segundos Moda Country
				</title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}  >
					<h1>Cadastrar Categorias</h1>

					<form className={styles.form} onSubmit={handleRegister} >
						<input 
							type="text" 
							placeholder="Digite o nome da categoria"
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

                        <label className={styles.labelAvatar}>
							<span>
								<FiUpload size={30} color="#000" />
							</span>

							<input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
						
							{ avatarUrl && (
								<img 
									className={styles.preview}
									src={avatarUrl}
									alt="Foto da categoria" 
									width={250}
									height={250}
								/>
							)}
						
						</label>

						<button type="submit" className={styles.buttonAdd}  >
							Cadastrar
						</button>


					</form>
				</main>
			</div>
		</>
	)
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

	return {
		props: {}
	}
})