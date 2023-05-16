import React from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const modalOpen = useSelector((store) => store.modal.isOpen)

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {modalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
