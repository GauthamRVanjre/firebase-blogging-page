import React, { useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Home = ({ isAuth }) => {
  const [posts, setPosts] = React.useState([]);
  const postCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    console.log("post deleted");
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      //console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postCollectionRef]);
  return (
    <div className="homePage">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>written by- {post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
