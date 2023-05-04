import { createContext, useState } from "react";
import useProducts from "./useProducts";

const counterContext = createContext();

export const CounterCntxtProvider = ({ children }) => {
  const { cart } = useProducts();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [counter, setCounter] = useState(cart.length);
  const [favList, setFavList] = useState();

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  return (
    <counterContext.Provider
      value={{
        counter,
        increment,
        decrement,
        setCounter,
        favList,
        setFavList,
        user,
        setUser,
      }}
    >
      {children}
    </counterContext.Provider>
  );
};

export default counterContext;
