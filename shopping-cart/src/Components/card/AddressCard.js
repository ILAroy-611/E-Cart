import { Card, Space } from "antd";
import { TextButton } from "../button";
import "./addressCard.css";

function AddressCard({address}) {
  return (
    <div >
      <Space direction="vertical" size={16}>
        <Card
          title={address.name} 
          hoverable
          // extra={<a href="#">More</a>}
          style={{
            maxWidth:400,
          }}
        >
          <div className="adddress-card">
            <div className="adddress-card-body">
            <p>S/o ${address.sonOf}</p>
            <p>{address.address1},</p>
            <p>{address.address2},</p>
            <p>{address.area}</p>
            <p>{`${address.district}, ${address.state} ${address?.pinCode ?? ''}`}</p>
            <p>Phone number: {address.mobNumber}</p>
            </div>
            <footer className="address-card-footer">
              <TextButton Action="Edit" />
              <TextButton Action="Delete" />
              <TextButton Action="Set as Default" />
            </footer>
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default AddressCard;
