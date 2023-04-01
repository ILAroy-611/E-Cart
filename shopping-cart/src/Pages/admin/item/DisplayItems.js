import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import ItemCard from "../../../Components/card/ItemCard";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import "./displayitems.css";

function DisplayItems() {
  const [loading, setLoading] = useState(true);
  const { getAllItemsAdmin, items } = useAdminPriv();

  useEffect(() => {
    async function fetchItemsAdmin() {
      try {
        await getAllItemsAdmin();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemsAdmin();
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <section className="flex admin-item-display">
          {items.map((item) => {
            return <ItemCard itemDetail={item} key={item._id} />;
          })}
        </section>
      )}
    </>
  );
}

export default DisplayItems;
