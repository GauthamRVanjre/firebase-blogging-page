import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  let navigate = useHistory();

  const createPost = async () => {
    console.log(`${auth.currentUser.displayName} and ${auth.currentUser.uid}`);
    await addDoc(collection(db, "posts"), {
      title,
      postText: post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate.push("/");
    console.log("post created");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate.push("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create Post</h1>
        <div className="inputGp">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Title... "
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post: </label>
          <textarea
            placeholder="Post... "
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
