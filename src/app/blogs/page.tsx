"use cache";

import axios from "axios";
import { MicrocmsResponse } from "../../../domain/Article";
import Image from "next/image";

const Blogs = async () => {
  console.log("MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY);
  console.log("exists:", !!process.env.MICROCMS_API_KEY);
  const getBlogs = async () => {
    const response = await axios.get<MicrocmsResponse>(
      "https://3xqf61m0kn.microcms.io/api/v1/blogs",
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
