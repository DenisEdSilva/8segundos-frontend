import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/admin/dashboard">
                    <img src="/logo.jpeg" alt="logo" width={80} height={80} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/admin/category">
                        <a>Categoria</a>
                    </Link>
                    <Link href="/admin/product">
                        <a>Produtos</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#000" size={25} />
                    </button>
                </nav>
            </div>
        </header>
    )

}