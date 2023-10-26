import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/profileinfo/${id}`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile info:', error);
      }
    };

    fetchProfileInfo();
  }, [id]);

  return (
    <div>
      <h1>Profile Page: {id}</h1>
      <h2>Your Posts:</h2>
      <ul>
        {posts.map((post) => (
          <div key={post._id} className="post-box">
            <p>Title: {post.title}</p>
            <p>Author: {post.author.Username}</p>
            <p>Summary: {post.summary}</p>
            <Link to={`/post/${post._id}`}>Read more</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
