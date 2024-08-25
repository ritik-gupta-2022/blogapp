import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CommentSection from "../components/CommentSection";

function PostPage() {
  const{ postSlug } = useParams();
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(false);
  const[post,setPost] = useState(null);
   
  useEffect(()=>{
    const fetchPost = async ()=>{
      try{
        setLoading(true);
        const res=await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if(res.ok){
          setLoading(false);
          setPost(data.posts[0]); // since we fetched post using slug we get only one post in array
          setError(false);
        }
        else{
          setError(true);
          setLoading(false);
          return;
        }
      }
      catch(err){
        setError(true);
        setLoading(false);
      }
    }

    fetchPost();
    console.log(postSlug);
  },[postSlug])

  if(loading) return(
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size='xl'/>
    </div>
  )
  return (
    <main className="p-3 flex flex-col mx-auto max-w-6xl min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl" > {post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button color={'gray'} pill size={'xs'}>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover"/>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length/1000).toFixed(0)} mins read</span>
      </div>

      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}></div>
      <CommentSection postId={post._id}/>
    </main>
  )
}

export default PostPage

// dangerouslySetInnerHTML={{__html: post && post.content}} this line forcefully sets html of div to post content