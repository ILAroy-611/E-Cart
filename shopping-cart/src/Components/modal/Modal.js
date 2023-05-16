import { createPortal } from "react-dom";
import { Modal } from "antd";

function CustomModal({
  children,
  modal_title,
  open,
  handleOk,
  handleCancel,
  confirmLoading,
}) {
  const modalNode = document.getElementById("modal-root");
  return createPortal(
    <>
      <Modal
        title={modal_title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{children}</p>
      </Modal>
    </>,
    modalNode
  );
}

export default CustomModal;
