import { Card } from "antd";

function SubTotalCard({cart_total, total_item_in_cart}) {
  return (
    <div>
        <Card title={`Subtotal ${total_item_in_cart} items: ${cart_total} INR`} bordered={true} hoverable >
        <p>Proceed to buy </p>
        {/* <p>Part of your order qualifies for FREE Delivery.</p> */}
      </Card>
    </div>
  )
}

export default SubTotalCard