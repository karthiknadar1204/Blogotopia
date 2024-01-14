import React, { useEffect, useState } from "react";
import Post from "../Post";
import axios from "axios";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/post");
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default IndexPage;
