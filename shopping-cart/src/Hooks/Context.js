import { createContext, useState } from "react";

const counterContext = createContext();

export const CounterCntxtProvider=({children})=>{

    const[counter, setCounter] = useState(0);

    const increment = ()=>setCounter(counter + 1);

    const decrement=()=>setCounter(counter-1);

    return (
        <counterContext.Provider value={{counter, increment, decrement}}>
            {children}
        </counterContext.Provider>
    )
}

export default counterContext;
