import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

function Hero() {
  const { blogs } = useAuth()
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          return
          
          

        })
      ) : (
        <div></div>

      )}
    </div>
  );
}

export default Hero