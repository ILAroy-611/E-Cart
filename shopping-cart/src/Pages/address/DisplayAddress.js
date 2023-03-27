import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../../Components/button/PrimaryButton";
import AddressCard from "../../Components/card/AddressCard";
import useAddress from "../../Hooks/useAddress";
import { MdAddLocationAlt } from "react-icons/md";
import "./displayaddress.css";

function DisplayAddress() {
  const { fetchUserAddress, address } = useAddress();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAddress() {
      try {
        let addressFetched = await fetchUserAddress();
        if (addressFetched) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

      {loading ? (
        <p className="loading-para">Loading... please wait!</p>
      ) : (
        <div className="flex addresses">
          {address.map((ele) => (
            <AddressCard key={ele._id} address={ele.address} />
          ))}
        </div>
      )}
    </section>
  );
}

export default DisplayAddress;
