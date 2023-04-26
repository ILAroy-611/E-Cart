import React, { useContext, useEffect } from 'react'
import { DisplayItems } from './admin/item'
import useProducts from '../Hooks/useProducts'
import ItemCard from '../Components/card/ItemCard';



export default function Home() {

  const {fetchAllProducts, products, getItemsFromCart} = useProducts();
  

  useEffect(()=>{
    async function handleFetchAllProducts(){
      try {
        await fetchAllProducts();
        
      } catch (error) {
        console.log('get all items',error);
      }
    }
    handleFetchAllProducts()
  },[])

  return (
    <div>
      Home
      {/* {console.log('products, ', products)} */}
      <div className="item-container flex-wrap">
      {products?.map(item=><ItemCard itemDetail={item} key={item._id}/>)}
      </div>
    </div>
  )
}
