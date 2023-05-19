import { Button } from "antd";
import './textbutton.css'

function TextButton({Action, onCLick}) {
  return (
    <Button
        type="text"
        size="default"
        shape="round"
        className="btn cart-text-btn"
        onClick={onCLick}
      >
        {Action}
      </Button>
  )
}

export default TextButton