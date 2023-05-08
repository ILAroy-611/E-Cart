import { createContext, useState } from "react";
import useProducts from "./useProducts";

const counterContext = createContext();

export const CounterCntxtProvider = ({ children }) => {
  // const { cart } = useProducts();
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [products, setProducts] = useState([]);
  const [cartInfo, setCartInfo] = useState({cart:[],counter:0});
  // const [counter, setCounter] = useState(cart?.length ?? 0);
  const [favList, setFavList] = useState([]);

  const increment = () => {
    setCartInfo({...cartInfo, counter:cartInfo.counter + 1});
  };

  const decrement = () => {
    setCartInfo({...cartInfo, counter:cartInfo.counter - 1});
  };

  return (
    <counterContext.Provider
      value={{
        increment,
        decrement,
        favList,
        setFavList,
        user,
        setUser,
        products, 
        setProducts,
        cartInfo,
        setCartInfo,
      }}
    >
      {children}
    </counterContext.Provider>
  );
};

export default counterContext;
