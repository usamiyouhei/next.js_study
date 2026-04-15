import axios from "axios";
import React from "react";
import { MicrocmsResponse } from "../../../domain/Article";
import Image from "next/image";

const Blogs = async () => {
  const getBlogs = async () => {
    const response = await axios.get<MicrocmsResponse>(
      "https://mf2p17uv52.microcms.io/api/v1/blogs",
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        },
      },
    );

    return response.data.contents.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.eyecatch.url,
      url: "/blogs/${item.id}",
    }));
  };

  const blogs = await getBlogs();

  return (
    <div>
      <h1>Blog 一覧</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Image src={blog.image} width={100} height={100} alt="" />
            <a href={blog.url}>{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
