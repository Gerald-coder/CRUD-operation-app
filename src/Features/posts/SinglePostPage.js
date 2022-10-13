import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "./PostSlice";
import PostAuthor from "./PostAuthor";
import Timeago from "./Timeago";
import ReactionsBtn from "./ReactionsBtn";
import { Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  // console.log("paramid", postId);
  const post = useSelector((state) => getPostById(state, Number(postId)));
  // console.log("param post", post);
  if (!post) {
    return <h2>post not found!</h2>;
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>
        <Link
          style={{
            color: "blueviolet",
            margin: ".2rem",
            textDecoration: "none",
          }}
          to={`/posts/edit/${post.id}`}
        >
          edit post
        </Link>
        <PostAuthor userId={post.userId} />
        <Timeago timestamp={post.date} />
      </p>
      <ReactionsBtn post={post} />
    </article>
  );
};

export default SinglePostPage;
