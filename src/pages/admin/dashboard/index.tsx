import Head from 'next/head';
import React, { useState } from 'react';
import { Header } from '../../../components/Header';
import { setupAPIClient } from '../../../services/api';
import { canSSRAuth } from '../../../utils/canSSRAuth';

interface DashboardProps {
    categories: CategoryProps[]
    products: ProductProps[]
}

type CategoryProps = {
    id: string;
    name: string;
    banner: string;
}

type ProductProps = {
    id: string;
    name: string;
    amount: string;

}

export default function Dashboard({ categories, products }: DashboardProps) {
    const [categoryList, setCategoryList] = useState(categories || [])
    const [productList, setProductList] = useState(products || [])


    return (
        <>
            <Head>
                <title>Painel - 8Segundos Moda Country</title>
            </Head>
            <div>
                <Header />
                <main>
                    {categoryList.map( item => (
                        <section key={item.id}>
                            <ul>
                                <li>{item.name}</li>
                            </ul>
                            
                        </section>
                    ))}
                    
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('categories/list')

    const response2 = await apiClient.get('categories/product/list')

    return {
        props: {
            categories: response.data,
            products: response2.data
        }
    }
    
})