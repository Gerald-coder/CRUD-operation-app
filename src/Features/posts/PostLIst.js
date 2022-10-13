import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getErrorMessage,
  getPostStatus,
  fetchPosts,
} from "./PostSlice";
import { useEffect } from "react";
import PostExcerps from "./PostExcerps";

const PostLIst = () => {
  const dispatch = useDispatch();

  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getErrorMessage);

  ////dispatching the state to the store direct from the index.js
  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);

  const posts = useSelector(selectAllPosts);
  // console.log("postllistPosts", posts);

  ////displaying our UI conditionally
  let content;
  if (postStatus === "loading") {
    content = <h2>Loading</h2>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => {
      return <PostExcerps key={post.id} post={post} />;
    });
  } else if (postStatus === "failed") {
    return <h2>{error}</h2>;
  }

  if (!content) {
    return <h2>posts not fetched</h2>;
  }
  return <section>{content}</section>;
};

export default PostLIst;
