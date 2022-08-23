import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles.module.scss';
import Head from "next/head";
import { Header } from "../../../components/Header";
import { setupAPIClient } from '../../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[]
}


export default function Products({ categoryList }: CategoryProps) {
    const [name, setName] = useState('');
	const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	
	const [avatarUrl, setAvatarUrl] = useState('');
	const [imageAvatar, setImageAvatar] = useState(null);

	const [categories, setCategories] = useState(categoryList || [])
	const [categorySelected, setCategorySelected] = useState(0)

	console.log(categoryList)
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

	function handleChangeCategory(event) {
		setCategorySelected(event.target.value)
	}

	async function handleRegister(event: FormEvent) {
		event.preventDefault();

		try {
			const data = new FormData();

			if (name === '' || price === '' || amount === '' || description === '' || imageAvatar === null) {
				toast.warning('Preencha todos os campos corretamente');
				return;
			}

			data.append('name', name);
			data.append('price', price);
            data.append('amount', amount)
			data.append('description', description);
			data.append('file', imageAvatar);
			data.append('category_id', categories[categorySelected].id);

			const apiClient = setupAPIClient();

			await apiClient.post('/categories/product', data)

			toast.success('Cadastro realizado com sucesso')
			setName('')
			setPrice('')
            setAmount('')
			setDescription('')
			setImageAvatar(null)
			setAvatarUrl('')

		} catch (error) {
			console.log(error);
			toast.error('Erro ao realizar o cadastro')
		}
	}


    return (
        <>
            <Head>
                <title>Novo Produto - 8Segundos Moda Country</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
					<h1>Novo Produto</h1>

					<form className={styles.form} onSubmit={handleRegister}>
						
						<label className={styles.labelAvatar}>
							<span>
								<FiUpload size={30} color="#000" />
							</span>

							<input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
						
							{ avatarUrl && (
								<img 
									className={styles.preview}
									src={avatarUrl}
									alt="Foto do produto" 
									width={250}
									height={250}
								/>
							)}
						
						</label>

						<select value={categorySelected} onChange={handleChangeCategory} >
							{categories.map( (item, index) => {
								return (
									<option 
										key={item.id} 
										value={index}
									>
										{item.name}
									</option>
								)
							})}
						</select>

						<input 
							type="text"
							placeholder='Digite o nome do produto'
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<input 
							type="text"
							placeholder='Preço do produto'
							className={styles.input}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>

						<input 
							type="text"
							placeholder='Quantidade de produtos'
							className={styles.input}
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>

						<textarea 
							placeholder='Descreva seu produto...'
							className={styles.input}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<button className={styles.buttonAdd} type="submit" >
							Cadastrar
						</button>

					</form>
				</main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
	const apiClient = setupAPIClient(ctx)
	
	const response = await apiClient.get('/categories/list');

	console.log(response.data)
	return {
		props: {
			categoryList: response.data
		} 
	}
})