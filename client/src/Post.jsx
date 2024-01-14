import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  index,
}) => {
  function limitText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const parts = cover.split("/");
  const fileName = parts[parts.length - 1];

  // Construct the new image source with only the file name
  const newCoverSrc = `http://localhost:4000/uploads/${fileName}`;
  console.log(author);
  return (
    <>
      <div className="hidden md:block">
        <div className={`${index % 2 === 0 ? "hidden" : "block"}`}>
          <div className="flex flex-col md:flex-row w-[90vw] mx-auto md:rounded-r-full rounded-b-full shadow-lg shadow-lime-500 hover:shadow-none bg-lime-50  justify-between mb-8 transition-all hover:scale-105 h-full pb-16 md:pb-0 duration-500">
            <div className="w-full h-1/2 md:w-1/3 md:h-[33vh] bg-black p-4">
              <Link to={`/post/${_id}`}>
                <img
                  src={`${newCoverSrc}`}
                  alt="image"
                  className="object-contain h-full w-full border-l-md rounded-2xl"
                />
              </Link>
            </div>
            <div className="w-full md:w-2/3 px-12 pt-2">
              <div className="flex flex-col justify-between mb-4">
                <Link to={`/post/${_id}`}>
                  <h2 className="font-bold text-3xl">{title}</h2>
                </Link>
                <p className="">
                  <a href="" className="author">
                    {author && author.Username}
                  </a>
                  <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
              </div>

              <p className="hidden md:block">{limitText(summary, 30)}</p>
              <p className="md:hidden block">{limitText(summary, 20)}</p>
            </div>
          </div>
        </div>
        <div className={`${index % 2 !== 0 ? "hidden" : "block"}`}>
          <div className="flex w-[90vw] mx-auto rounded-l-full text-right shadow-lg hover:shadow-none shadow-lime-500 bg-black text-white justify-between mb-8 transition-all hover:scale-105 duration-500">
            <div className="w-2/3 px-12 pt-2">
              <div className="flex flex-col justify-between mb-4">
                <Link to={`/post/${_id}`}>
                  <h2 className="font-bold text-3xl">{title}</h2>
                </Link>
                <p className="">
                  <a href="" className="author">
                    {author && author.Username}
                  </a>
                  <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
              </div>

              <p className="">{limitText(summary, 50)}</p>
            </div>
            <div className="w-1/3 h-[33vh] bg-lime-50 p-4">
              <Link to={`/post/${_id}`}>
                <img
                  src={`${newCoverSrc}`}
                  alt="image"
                  className="object-contain h-full w-full border-l-md rounded-2xl"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className={``}>
          <div className="flex min-h-[25vh] flex-col md:flex-row w-[90vw] mx-auto md:rounded-r-full rounded-b-full shadow-lg shadow-lime-500 hover:shadow-none bg-lime-50 text-black justify-between mb-8 transition-all hover:scale-105 h-full pb-16 md:pb-0 duration-500">
            <div className="w-full h-1/2 md:w-1/3 md:h-[33vh] bg-black p-4">
              <Link to={`/post/${_id}`}>
                <img
                  src={`${newCoverSrc}`}
                  alt="image"
                  className="object-contain h-full w-full border-l-md rounded-2xl"
                />
              </Link>
            </div>
            <div className="w-full md:w-2/3 px-5 pt-2 pb-12 md:px-12 md:pt-2">
              <div className="flex flex-col justify-between mb-4">
                <Link to={`/post/${_id}`}>
                  <h2 className="font-bold text-3xl">{title}</h2>
                </Link>
                <p className="">
                  <a href="" className="author">
                    {author && author.Username}
                  </a>
                  <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
              </div>

              <p className="hidden md:block">{limitText(summary, 30)}</p>
              <p className="md:hidden block">{limitText(summary, 20)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
