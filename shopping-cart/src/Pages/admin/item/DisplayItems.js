import { Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import ItemCard from "../../../Components/card/ItemCard";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import "./displayitems.css";
import counterContext from "../../../Hooks/Context";

function DisplayItems() {
  // const [loading, setLoading] = useState(true);
  const { getAllItemsAdmin, loading, setLoading } = useAdminPriv();
  const { adminItem, setAdminItem } = useContext(counterContext);

  useEffect(() => {
    async function fetchItemsAdmin() {
      // setLoading(true);
      try {
        let response = await getAllItemsAdmin();
        setAdminItem([...response.data.products]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItemsAdmin();
  }, []);
  return (
    // <>
    //   {loading ? (
    //     <Skeleton />
    //   ) : (
    //     <section className="flex admin-item-display">
    //       {items.map((item) => {
    //         return <ItemCard itemDetail={item} key={item._id} />;
    //       })}
    //     </section>
    //   )}
    // </>
    <>
      <section className="flex admin-item-display">
        {adminItem &&
          adminItem.map((item) => {
            return (
              <Skeleton loading={loading}>
                <ItemCard itemDetail={item} key={item._id} />
              </Skeleton>
            );
          })}
      </section>
    </>
  );
}

export default DisplayItems;
