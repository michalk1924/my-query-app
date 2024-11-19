import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyApp</div>
            <nav>
                <div className={styles.navList}>
                    <Link href="/add" className={styles.navItem}>Add Car</Link>
                    <Link href="/" className={styles.navItem}>Home</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
