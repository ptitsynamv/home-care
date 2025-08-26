"use client";

import { BlogPost, BlogResponse } from "@/app/_lib/interfaces/blog";
import { config } from "@/app/_lib/interfaces/config";
import { useEffect, useState } from "react";

const API_URL = config.apiUrl;

export default function Page() {
  const [posts, setPosts] = useState<BlogPost[]>();

  useEffect(() => {
    fetch(API_URL + 'blog')
      .then(response => response.json())
      .then((data: BlogResponse) => {
        if (!data || !data.posts) {
          console.error("No posts found in the response");
          return;
        }
        if (data.posts) {
          setPosts(data.posts);
        }

        console.log(data)
      });
  }, []);

  return (
    <>
      {posts && posts.map((post) => (
        <a key={post.id} href="#" className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {post.content}
          </p>
        </a>
      ))}
    </>
  )
}
