import { useState } from "react";

function useModal() {
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  async function toggle() {
    setOpenModal(!openModal);
  }

  async function handleConfirmLoading() {
    setConfirmLoading(!confirmLoading);
  }

  return { openModal, setOpenModal, toggle,confirmLoading, handleConfirmLoading };
}

export default useModal;
