import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, editPost } from "./PostSlice";
import { selectAllUsers } from "../users/UserSlice";
import { deletePost } from "./PostSlice";

const EditPostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  // console.log("edit ", postId);

  const navigate = useNavigate();

  const post = useSelector((state) => getPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  //   console.log("the post", post);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";
  const onSavePostClick = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          editPost({
            title,
            id: post.id,
            body: content,
            userId,
            reactions: post.reactions,
          })
        );
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  ///onDeletePost
  const onDeletePost = (e) => {
    e.preventDefault();

    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setRequestStatus("idle");
    }
  };

  ////the event handlers
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const users = useSelector(selectAllUsers);

  const usersoptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  if (!post) {
    return <h2>post not found</h2>;
  }
  return (
    <div>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author</label>
        <select value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersoptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" value={content} onChange={onContentChange} />

        <button type="button" disabled={!canSave} onClick={onSavePostClick}>
          save Post
        </button>

        <button type="button" className="deleteButton" onClick={onDeletePost}>
          delete post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
