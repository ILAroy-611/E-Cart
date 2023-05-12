import { Avatar, Card } from "antd";
import { useContext } from "react";
import counterContext from "../../../Hooks/Context";
import ActionButton from "../../button/ActionButton";
import "./commentcard.css";
import useProducts from "../../../Hooks/useProducts";

const { Meta } = Card;
function CommentCard({ comment, prodId }) {
    console.log(comment,prodId);
  const { user } = useContext(counterContext);
  const { deleteComment } = useProducts()

  const handleDeleteComment=async()=>{
    let body={
        comment: {
             id: comment.id,
             productId: prodId,
        }
    }
    try {
        let response= await deleteComment(body);
        if(response.msg)window.location.reload();
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div>
      <Card
        style={{
          //   width: 500,
          marginTop: 16,
          textAlign:"left"
        }}
        
        actions={user.username === comment.username ?[
          <ActionButton Action="Edit" />,
          <ActionButton Action="Delete" onCLick={handleDeleteComment}/>,
        ]:null}
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
          title={comment?.username }
          description={<>
          <p>{comment.stars}</p>
          <h4>{comment.body}</h4>
          </>}
        />
      </Card>
    </div>
  );
}
// onCLick={() => handleBlockUser(userDetail.id)}
export default CommentCard;
