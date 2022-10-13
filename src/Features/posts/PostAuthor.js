import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UserSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  //   console.log("author  users", users);

  const author = users.find((user) => user.id === Number(userId));
  //   console.log("author", author);

  return <span> by {author ? author.name : "unknown author"}</span>;
};

export default PostAuthor;
