import React from 'react'
import mealsImage from '../../assets/meals.jpg'
import HeaderCardButton from './HeaderCardButton'
import styles from './header.module.css'

const Header = ({ enableCart }) => {
    const cartHandler = () => {
        enableCart();
    }

    return (
        <>
            <header className={styles.header}>
                <h1>OrderOut</h1>
                <HeaderCardButton cartHandler={cartHandler} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="mealsImage" />
            </div>
        </>
    )
}

export default Header