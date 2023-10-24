import React from "react";
import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom'

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
  function limitText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }
  
  const parts = cover.split('/');
  const fileName = parts[parts.length - 1];

  // Construct the new image source with only the file name
  const newCoverSrc = `http://localhost:4000/uploads/${fileName}`;
  console.log(author);
  return (
    <>
      <div className="post">
        <Link to={`/post/${_id}`} >
          <div className="image">
            <img src={`${newCoverSrc}`} alt="image" />
        </div>
        </Link>
        <div className="contents">
        <Link to={`/post/${_id}`} > 
          <h2>{title}</h2>
        </Link>  
          <p className="info">
            <a href="" className="author">
            {author && author.Username}
            </a>
            <time>
              {formatISO9075(new Date(createdAt))}
            </time>
          </p>
          <p className="summary">
  {limitText(summary, 50)}
</p>
        </div>
      </div>
    </>
  );
};

export default Post;
