import { useEffect, useContext } from "react";
import { DisplayItems } from "../admin/item";
import useProducts from "../../Hooks/useProducts";
import ItemCard from "../../Components/card/ItemCard";
import "./home.css";
import counterContext from "../../Hooks/Context";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

export default function Home() {
  // const {fetchAllProducts, products} = useProducts();
  const { fetchAllProducts } = useProducts();
  const { setProducts, products } = useContext(counterContext);

  useEffect(() => {
    async function handleFetchAllProducts() {
      try {
        const response = await fetchAllProducts();
        setProducts([...response.data.products]);
      } catch (error) {
        console.log("get all items", error);
      }
    }
    handleFetchAllProducts();
  }, []);

  return (
    <div>
      {!products ? (
        <Skeleton />
      ) : (
        <div className="medium-display-container flex-wrap">
          {products?.map((item) => {
            return (
              <>
                {/* <Link
                  to={`/products/${item.name}`}
                  state={item}
                  className="link"
                  key={item._id}
                > */}
                  <ItemCard itemDetail={item} />
                {/* </Link> */}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
