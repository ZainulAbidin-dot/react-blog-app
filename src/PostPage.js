import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts.js";

const PostPage = () => {
  const {posts, setposts} = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();


  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setposts(postList);
      navigate("/");
    } catch (err) {
      console.log("====================================");
      console.log(`Error: ${err.message}`);
      console.log("====================================");
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/post/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post not Found</h2>
            <p>Well, that was not expected.</p>
            <p>
              <Link to="/">Visit our Hompage for some Blogs</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
