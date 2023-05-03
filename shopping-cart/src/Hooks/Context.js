import { createContext, useState } from "react";
import useProducts from "./useProducts";

const counterContext = createContext();

export const CounterCntxtProvider = ({ children }) => {
  const { cart } = useProducts();
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
      value={{ counter, increment, decrement, setCounter, favList, setFavList }}
    >
      {children}
    </counterContext.Provider>
  );
};

export default counterContext;
