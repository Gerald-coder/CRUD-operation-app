import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";

// /////intoducing Redux async thunk
// const initialState = [
//   {
//     id: 1,
//     title: "Leads",
//     date: sub(new Date(), { minutes: 15 }).toISOString(),
//     content:
//       "i will always stick around God , i trust deeply in what he can do for his son",
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },

// ];

///id generator
const getId = () => {
  let id = parseInt(Math.random().toString().substring(2, 4));
  return (id += 100);
};

// console.log(getId());

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/newPosts",
  async (initial) => {
    console.log("the initial new post", initial);
    try {
      const response = await axios.post(POST_URL, initial);
      return response.data;
    } catch (error) {
      return error.messge;
    }
  }
);

export const editPost = createAsyncThunk("post/editPost", async (initial) => {
  try {
    const { id } = initial;
    const response = await axios.put(`${POST_URL}/${id}`, initial);
    return response.data;
  } catch (error) {
    // return error.message; ////since we can only interact with the fake API rather than adding items to it, to solve this, add the next line rather than this line
    return initial; //// N/nly  this is not acceptable, for test purposes
  }
});

export const deletePost = createAsyncThunk(
  "post/deletepost",
  async (initial) => {
    const { id } = initial;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`);
      // console.log("post to delete", response.data);
      if (response?.status === 200) return initial;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addPost: {
    //   reducer: (state, action) => {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, body, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         body,
    //         title,
    //         userId,
    //         date: new Date().toISOString(),
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    reactionAdded(state, action) {
      const { reaction, postId } = action.payload;
      const exitingPost = state.posts.find((post) => post.id === postId);
      if (exitingPost) {
        exitingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        ////adding the other payload that are not in the API
        let min = 0;
        const loadedPost = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPost);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.id = getId();
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        // action.payload.id = nanoid();
        // console.log("new post payload", action.payload);
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          alert(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          alert("caanot delete post");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        // console.log("main", posts);
        state.posts = posts;
      });
  },
});

///getting specific post
export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const getPostStatus = (state) => state.posts.status;
export const getErrorMessage = (state) => state.posts.error;
export const selectAllPosts = (state) => state.posts.posts;

////the reducer
export default PostSlice.reducer;
export const { addPost, reactionAdded } = PostSlice.actions;
