import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import PrimaryButton from "../../Components/button/PrimaryButton";
import useAddress from "../../Hooks/useAddress";
import AddressCard from "../../Components/parts/address/Address";
import { MdAddLocationAlt } from "react-icons/md";
import counterContext from "../../Hooks/Context";
import { Skeleton } from "antd";
import "./displayaddress.css";

function DisplayAddress() {
  const { fetchUserAddress,loading, setLoading  } = useAddress();
  const { address, setAddress } = useContext(counterContext);

  async function fetchAddress() {
    try {
      let response = await fetchUserAddress();
      setAddress([...response.data.address]);
      // setLoading(false);
      setTimeout(()=>setLoading(false), 2000)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <section className="displayaddress-container">
      <header className="displayaddress-header flex">
        <h3>Your Addresses</h3>
        <NavLink to="/address/add" className="link address-link">
          <MdAddLocationAlt /> Add Address
        </NavLink>
      </header>
      {/* <Skeleton loading={loading}> */}
      <div className="flex addresses">
        {address?.map((ele) => (
        <Skeleton loading={loading}> 
          <AddressCard
            key={ele._id}
            userAddress={ele.address}
            addressID={ele._id}
          />
          </Skeleton>
        ))}
      </div>
      {/* </Skeleton> */}
    </section>
  );
}

export default DisplayAddress;
