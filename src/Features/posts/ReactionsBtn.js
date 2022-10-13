import { useDispatch } from "react-redux";
import { reactionAdded } from "./PostSlice";

const ReactionsBtn = ({ post }) => {
  //   console.log("reaction post ", post);
  const dispatch = useDispatch();

  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    // console.log("name and emoji", name, emoji);
    const onHandleReactionClick = (e) => {
      e.preventDefault();
      dispatch(reactionAdded({ reaction: name, postId: post.id }));
    };
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={onHandleReactionClick}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionsBtn;
