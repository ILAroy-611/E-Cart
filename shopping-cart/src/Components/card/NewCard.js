import { Avatar, Card } from "antd";

const { Meta } = Card;
function NewCard({
  children,
  bordered,
  card_style,
  card_actions,
  meta,
  card_title,
}) {

  const {
    meta_title,
    meta_description,
    meta_avatar,
    meta_avatarShape,
    meta_avatarSize,
  } = meta;

  return (
    <div>
      {/* {
          //   width: 500,
          marginTop: 16,
          textAlign: "left",
          border: "1px solid black",
        } */}
      <Card
        title={card_title}
        bordered={bordered}
        hoverable
        style={card_style}
        actions={card_actions}
      >
        {children}
        <Meta
          title={meta_title}
          description={meta_description}
          avatar={
            meta_avatar?
            <Avatar
              src={meta_avatar}
              shape={meta_avatarShape}
              size={meta_avatarSize}
            />:null
          }
        ></Meta>
      </Card>
    </div>
  );
}

export default NewCard;
