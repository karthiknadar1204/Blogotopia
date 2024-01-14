import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const PostPage = () => {
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((response) => {
      setPostInfo(response.data);
    });
  }, [id]);

  if (!postInfo) {
    return "";
  }

  const parts = postInfo.cover.split("/");
  const fileName = parts[parts.length - 1];

  const newCoverSrc = `http://localhost:4000/uploads/${fileName}`;

  return (
    // <div className="gradient-bg"></div>
    <div className="gradient-bg flex flex-col pt-12 justify-center items-center ">
      <div className="flex justify-center items-center h-full ">
        <div className="border-8 border-white hover:border-4 transition-all duration-200 p-2 hover:p-0">
          <img src={newCoverSrc} alt="image" />
        </div>
      </div>

      <div className=" flex flex-col gap-5 px-12 pt-12  min-w-[80vw]  bg-black text-white m-12">
        <h1 className="text-4xl">{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">
          {postInfo.author.Username} Fix kardo na bhadwe madarchod{" "}
        </div>
        <div className="h-2 from-lime-700 via-lime-200 to-lime-700  bg-gradient-to-r "></div>

        <div className="">
          {userInfo.id === postInfo.author._id && (
            <div>
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                Edit this post
              </Link>
            </div>
          )}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPage;
