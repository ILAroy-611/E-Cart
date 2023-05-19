import { Space } from "antd";
import { Link } from "react-router-dom";
import { TextButton } from "../../ui/button";
import NewCard from "../../card/NewCard";
import { useContext } from "react";
import counterContext from "../../../Hooks/Context";
import useAddress from "../../../Hooks/useAddress";
import "./address.css";

function AddressCard({ userAddress, addressID }) {
  const { address, setAddress } = useContext(counterContext);
  const { fetchUserAddress, deleteAddress, loading, setLoading } = useAddress();

  const handleDeleteAddress = async (addressID) => {
    try {
      let addressDeleted = await deleteAddress(addressID);
      if (addressDeleted) {
        let response = await fetchUserAddress();
        setAddress([...response.data.address]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(addressID)
  return (
    <div>
      <Space direction="vertical" size={16}>
        {/* <Skeleton loading={loading}> */}
        <NewCard
          card_title={userAddress.name}
          bordered={true}
          card_style={{
            maxWidth: "400px",
            border: "1px solid black",
          }}
          card_actions={[
            <Link to="/address/edit" state={{ userAddress, addressID }}>
              <TextButton Action="Edit" />
            </Link>,
            <TextButton
              Action="Delete"
              onCLick={() => handleDeleteAddress(addressID)}
            />,
          ]}
        >
          <div className="adddress-card">
            <div className="adddress-card-body">
              <p>S/o ${userAddress.sonOf}</p>
              <p>{userAddress.address1},</p>
              <p>{userAddress.address2},</p>
              <p>{userAddress.area}</p>
              <p>{`${userAddress.district}, ${userAddress.state} ${
                userAddress?.pinCode ?? ""
              }`}</p>
              <p>Phone number: {userAddress.mobNumber}</p>
            </div>
          </div>
        </NewCard>
        {/* </Skeleton> */}
      </Space>
    </div>
  );
}

export default AddressCard;
