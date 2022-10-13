import PostAuthor from "./PostAuthor";
import Timeago from "./Timeago";
import ReactionsBtn from "./ReactionsBtn";
import { Link } from "react-router-dom";

const PostExcerps = ({ post }) => {
  const { title, body, userId, date } = post;
  //   console.log("postExcerpts post", post);
  return (
    <article>
      <h3>{title}</h3>
      <p className="excerpt">{body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link
          style={{
            margin: ".2rem",
            textDecoration: "none",
            color: "blueviolet",
          }}
          to={`/posts/${post.id}`}
        >
          view Post
        </Link>
        <PostAuthor userId={userId} />
        <Timeago timestamp={date} />
      </p>
      <ReactionsBtn post={post} />
    </article>
  );
};

export default PostExcerps;
