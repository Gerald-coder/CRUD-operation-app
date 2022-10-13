import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../users/UserSlice";
import { addNewPost } from "./PostSlice";
import { selectAllPosts } from "./PostSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const users = useSelector(selectAllUsers);
  // console.log(users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  // console.log("new post", posts);

  ////toggling save button
  const cansSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  ////handlers
  const onAuthorChange = (e) => setUserId(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onTitleChange = (e) => setTitle(e.target.value);
  // console.log(userId, content, title);

  ///submit button
  const onSubmit = (e) => {
    e.preventDefault();
    if (cansSave) {
      try {
        setRequestStatus("pending");
        dispatch(addNewPost({ title, userId, body: content })).unwrap();

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
  ///usersoptions
  const usersoptions = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });
  return (
    <div>
      <form>
        <label htmlFor="posttitle">Title:</label>
        <input
          type="text"
          id="posttitle"
          value={title}
          onChange={onTitleChange}
        />

        <select value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersoptions}
        </select>

        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          cols="30"
          rows="10"
          value={content}
          onChange={onContentChange}
        />

        <button disabled={!cansSave} onClick={onSubmit}>
          save
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
