import PostLIst from "../Features/posts/PostLIst";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AddPostForm from "../Features/posts/AddPostForm";
import SinglePostPage from "../Features/posts/SinglePostPage";
import EditPostPage from "../Features/posts/EditPostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLIst />} />
        <Route path="posts">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
