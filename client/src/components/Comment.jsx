import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from 'flowbite-react';
import {FaThumbsUp} from 'react-icons/fa'
import {  useSelector } from 'react-redux';
function Comment({comment, onLike}) {
    const[user,setUser] = useState({});
    const {currentUser} = useSelector((state) => state.user);
    useEffect(()=>{
       
        const getUser = async()=>{
            try{
                console.log(comment);
                console.log(moment(comment.createdAt).fromNow());
                const res =  await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            }
            catch(err){
                console.log(err.message)
            }
        }
        getUser();
    },[comment])

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className='font-bold mr-1 text-sm truncate'>{user ? `@${user.username}`: 'anonymous user'}</span>
                {/* moment is a package used for showing time like 2 days ago */}
                <span className='text-gray-500 text-xs'>  {moment(comment.createdAt).fromNow()} </span> 
            </div>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                <button className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' }`} type='button' onClick={()=>{onLike(comment._id)}}>
                    <FaThumbsUp className='text-sm'/>
                </button>
                <p className='text-gray-500'>
                    {
                        comment.numberOfLikes>0 && comment.numberOfLikes + " "+ (comment.numberOfLikes===1?'like':'likes')
                    }
                </p>
            </div>
        </div>
    </div>
  )
}

export default Comment