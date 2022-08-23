import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import logoImg from '../../public/logo.jpeg';
import { setupAPIClient } from '../services/api';
import styles from '../styles/home.module.scss';
import { canSSRGuest } from '../utils/canSSRGuest';

interface HomeProps {
    categories: CategoryProps[]
}

type CategoryProps = {
    id: string;
    name: string;
    banner: string;
}

export default function Home({ categories }: HomeProps) {
    const [categoryList, setCategoryList] = useState(categories || []);
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === "image/jpeg" || image.type === "image.png") {
            setImageAvatar(image)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.img}>
                    <Image src={logoImg} alt="Logo Image" width={150} height={150} />
                </div>
                <div className={styles.nav}>
                    <nav>
                        <a href=""></a>
                    </nav>
                </div>
            </div>
            <div className={styles.categoryContainer}>
                <h1 className={styles.title}>Catalogo</h1>
                <div>
                    {categoryList.map( item => (
                        <section key={item.id}>
                            <Image src={item.banner} alt="category name" />
                            <span>{item.name}</span>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/categories/list')


    return {
        props: {
            categories: response.data
        }
    }
})