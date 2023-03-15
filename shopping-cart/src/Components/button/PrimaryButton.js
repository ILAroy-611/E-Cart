import { Button } from "antd";
import './primaryButton.css'

function PrimaryButton({Action, onCLick}) {
  return (
    <Button
        type="primary"
        size="large"
        shape="round"
        className="btn cart-primary-btn"
        onClick={onCLick}
      >
        {Action}
      </Button>
  )
}

export default PrimaryButton
