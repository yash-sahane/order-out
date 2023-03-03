import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './Components/store/CartProvider'
import { useState } from 'react'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const disableCart = () => {
    setCartIsShown(false);
  }

  const enableCart = () => {
    setCartIsShown(true);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart disableCart={disableCart} />}
      <Header enableCart={enableCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
