import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext({
  showCart: false,
  setShowCart: () => {},

  cartItems: [],
  totalPrice: 0,
  totalQuantites: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  onAddToCart: () => {},
});

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantites, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);

  const incQty = () => {
    setQty((prevState) => prevState + 1);
  };
  const decQty = () => {
    setQty((prevState) => {
      if (prevState - 1 < 0) return 0;
      return prevState - 1;
    });
  };

  const onAddToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    setTotalPrice((prevState) => prevState + product.price * quantity);
    setTotalQuantities((prevState) => prevState + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartPRoduct) => {
        if (cartPRoduct._id === product._id) {
          return {
            ...cartPRoduct,
            quantity: cartPRoduct.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantites,
        qty,
        incQty,
        decQty,
        onAddToCart,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
