
import { useContext } from "react";
import counterContext from "../../../Hooks/Context";
import ActionButton from "../../ui/button/ActionButton";
import useProducts from "../../../Hooks/useProducts";
import CustomModal from "../../ui/modal/Modal";
import useModal from "../../../Hooks/useModal";
import { getInitialValues } from "./helper";
import { useFormik } from "formik";
import { addCommentOption } from "../../../Pages/productDetail/helper";
import SCInput from "../../ui/sc-input/SCInput";
import NewCard from "../NewCard";
import "./comment.css";


function CommentCard({ comment, prodId }) {
  const { user, commentsList, setCommentsList } = useContext(counterContext);
  const { deleteComment, addOrEditComment, getAllCommentsforProduct } =
    useProducts();
  const { openModal, toggle, handleConfirmLoading, confirmLoading } =
    useModal();

  const initialValues = getInitialValues(comment);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      let body = {
        comment: {
          id: comment.id,
          stars: values.stars,
          body: values.body,
          productId: prodId,
        },
      };
      try {
        handleConfirmLoading();
        let response = await addOrEditComment({ method: "put", body });
        let comments = await getAllCommentsforProduct(prodId);
        handleConfirmLoading();
        setCommentsList([...comments.data.comments]);
        toggle();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDeleteComment = async () => {
    let body = {
      comment: {
        id: comment.id,
        productId: prodId,
      },
    };
    try {
      let response = await deleteComment(body);
      if (response.msg) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (event) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <div>
      <NewCard
        bordered={true}
        card_style={{
          marginTop: 16,
          textAlign: "left",
          border: "1px solid black",
        }}
        card_actions={
          user.username === comment.username
            ? [
                <ActionButton Action="Edit" onCLick={handleEditComment} />,
                <ActionButton Action="Delete" onCLick={handleDeleteComment} />,
              ]
            : null
        }
        meta={{
          meta_title: comment.username,
          meta_description: (
            <>
              <p>{comment.stars}</p>
              <h4>{comment.body}</h4>
            </>
          ),
          meta_avatar:
            comment?.image ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB61TjlBXuRQcAeKurz2-JmKOXy72HChFYD39017Y2g&s",
          meta_avatarShape: "",
          meta_avatarSize: "",
        }}
        card_title={""}
      ></NewCard>
      <CustomModal
        open={openModal}
        modal_title={"Edit Comment"}
        handleCancel={toggle}
        handleOk={formik.handleSubmit}
        confirmLoading={confirmLoading}
      >
        {addCommentOption.map((option) => (
          <SCInput formik={formik} option={option} />
        ))}
      </CustomModal>
      {/* <Card
        bordered={true}
        hoverable
        style={{
          //   width: 500,
          marginTop: 16,
          textAlign: "left",
          border: "1px solid black",
        }}
        actions={
          user.username === comment.username
            ? [
                <ActionButton Action="Edit" onCLick={handleEditComment} />,
                <ActionButton Action="Delete" onCLick={handleDeleteComment} />,
              ]
            : null
        }
      >
        <Meta
          avatar={
            <Avatar
              src={
                user?.image ??
                `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB61TjlBXuRQcAeKurz2-JmKOXy72HChFYD39017Y2g&s`
              }
            />
          }
          title={comment?.username}
          description={
            <>
              <p>{comment.stars}</p>
              <h4>{comment.body}</h4>
            </>
          }
        />
      </Card> */}
      {/* <CustomModal
        open={openModal}
        modal_title="Edit Comment"
        handleCancel={toggle}
        handleOk={formik.handleSubmit}
        confirmLoading={confirmLoading}
      >
        {addCommentOption.map((option) => (
          <SCInput formik={formik} option={option} />
        ))}
      </CustomModal> */}
    </div>
  );
}
// onCLick={() => handleBlockUser(userDetail.id)}
export default CommentCard;
