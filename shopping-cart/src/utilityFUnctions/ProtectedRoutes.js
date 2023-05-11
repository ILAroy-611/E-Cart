import { useContext, useEffect } from "react";
import counterContext from "../Hooks/Context";
import { Navigate, useLocation } from "react-router-dom";
import useProducts from "../Hooks/useProducts";

function ProtectedRoutes({ children }) {
  const { user, cartInfo, setCartInfo } = useContext(counterContext);
  const location = useLocation();
  const { getItemsFromCartOrWishList } = useProducts();

  async function handleSetCartCounter(){
    try {
      const response = await getItemsFromCartOrWishList({
        url:`user/cart`,
      });
      await setCartInfo({...cartInfo, cart:response.data.cart.product, counter:response.data.cart.product.length});
    } catch (error) {
      console.log('handleSetCounter error ',error);
    }
  }
  useEffect(()=>{
    handleSetCartCounter();
  },[]);

  return (
    <div>
        {console.log(user)}
      {user.username ? (
        children
      ) : (
        <Navigate to="/login" state={{ path: location.pathname }} replace/>
      )}
    </div>
  );
}

export default ProtectedRoutes;
