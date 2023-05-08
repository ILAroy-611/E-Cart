import { useContext, useEffect, useState } from "react";
import useProducts from "../../Hooks/useProducts";
import { FavCard } from "../../Components/card";
import counterContext from "../../Hooks/Context";
import "./favlist.css";

function DisplayFavList() {
  const { getItemsFromCartOrWishList } = useProducts();
  const { favList, setFavList } = useContext(counterContext);

  async function handleFetchFavList() {
    // console.log("in useEffect of displayFavList");
    try {
      let response = await getItemsFromCartOrWishList({
        url: `user/fav`,
      });
      //   console.log("fetching done");
      if (response.data.allFav.fav) setFavList([...response.data.allFav.fav]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchFavList();
  }, []);

  //   console.log("parent", favList?.fav);
  return (
    <div className="sm-display-container">
      {favList.length>=1 ? (
        <>
          {console.log("in favList parent")}
          <h2>My WishList</h2>
          {favList.map((favItem) => (
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
