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
    <div className="gradient-bg py-8">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post
            key={post.id}
            {...post}
            index={index}
            // style={index % 2 === 1 ? { transform: "scaleX(-1)" } : {}}
          />
        ))}
    </div>
  );
};

export default IndexPage;
