import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import {UserContext} from '../UserContext'
import { useContext } from 'react';

const PostPage = () => {
  const {userInfo}=useContext(UserContext)
  const [postInfo, setPostInfo] = useState('');
  const { id } = useParams();
  console.log(id); 

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((response) => {
      setPostInfo(response.data);
    });
  }, [id]);

  if (!postInfo) {
    return '';
  }

  const parts = postInfo.cover.split('/');
  const fileName = parts[parts.length - 1];

  const newCoverSrc = `http://localhost:4000/uploads/${fileName}`;

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">
        {postInfo.author.Username}
      </div>
      <div className="edit-row">
        {
          userInfo.id===postInfo.author._id && (
            <div>
              <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Edit this post</Link>
            </div>
          )
        }
      </div>
      <div className="image">
        <img src={newCoverSrc} alt="image" />
      </div>
      <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
