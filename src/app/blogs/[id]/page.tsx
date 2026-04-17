import axios from "axios";
import { Suspense } from "react";
import { MicrocmsContent, MicrocmsResponse } from "../../../../domain/Article";
import Image from "next/image";
import ReloadButton from "./ReloadButton";

type Params = {
  id: string;
};

async function Blog({ params }: { params: Params }) {
  "use cache";
  const { id } = await params;

  console.log("id:", id);
  console.log("MICROCMS_API_KEY exists:", !!process.env.MICROCMS_API_KEY);

  const response = await axios.get<MicrocmsContent>(
    `https://3xqf61m0kn.microcms.io/api/v1/blogs/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    },
  );

  const blog = response.data;

  return (
    <article>
      <Image src={blog.eyecatch.url} width={100} height={100} alt="" />
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <ReloadButton id={id} />
    </article>
  );
}

function BlogDetail({ params }: { params: Params }) {
  return (
    <div>
      <h1>ブログ詳細</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Blog params={params} />
      </Suspense>
    </div>
  );
}
export default BlogDetail;
