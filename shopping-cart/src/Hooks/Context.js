import { createContext, useState } from "react";
import useProducts from "./useProducts";

const counterContext = createContext();

export const CounterCntxtProvider=({children})=>{

    const {cart} = useProducts();
    const[counter, setCounter] = useState(cart.length);
    
    // const setInitialCounter=async()=>{
    //     try {
    //         console.log('in the set initial counter context');
    //         let success= await getItemsFromCart();
    //         console.log('context step2');
    //         if(success){
    //             setCounter(cart.length) ;
    //             console.log('after set in context');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }

    const increment = ()=>{
        setCounter(counter + 1);
    }

    const decrement=()=>{
        setCounter(counter-1);
    }

    return (
        <counterContext.Provider value={{counter, increment, decrement, setCounter}}>
            {children}
        </counterContext.Provider>
    )
}

export default counterContext;
