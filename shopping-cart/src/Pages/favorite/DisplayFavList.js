import { useContext, useEffect, useState } from "react";
import useProducts from "../../Hooks/useProducts";
import { FavCard } from "../../Components/card";
import counterContext from "../../Hooks/Context";
import "./favlist.css";

function DisplayFavList() {
  const { fetchFavList } = useProducts();
  const { favList, setFavList } = useContext(counterContext);

  async function handleFetchFavList() {
    // console.log("in useEffect of displayFavList");
    try {
      let response = await fetchFavList();
      //   console.log("fetching done");
      setFavList({ ...response.data.allFav });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchFavList();
  }, []);

  //   console.log("parent", favList?.fav);
  return (
    <div className="favList-container">
      {favList?.fav?.length ? (
        <>
          {console.log("in favList parent")}
          <h2>My WishList</h2>
          {favList?.fav?.map((favItem) => (
            <FavCard item={favItem} />
          ))}
        </>
      ) : (
        <h2>
          {/* {console.log("in favList parent null")} */}
          No items added to your wish list yet!
        </h2>
      )}
    </div>
  );
}

export default DisplayFavList;
