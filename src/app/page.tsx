import axios from "axios";
import Image from "next/image";
import { MicrocmsResponse, QiitaResponse } from "../../domain/Article";
import { Suspense } from "react";

async function QiitaArticles() {
  const response = await axios.get<QiitaResponse[]>(
    "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
      },
    },
  );
  const items = response.data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image:
      "https://pbs.twimg.com/card_img/2043467245570113536/peVChdf4?format=jpg&name=large",
  }));
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Image src={item.image} width={100} height={100} alt="" />
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

async function MicroCMSArticles() {
  const response = await axios.get<MicrocmsResponse>(
    "https://3xqf61m0kn.microcms.io/api/v1/blogs",
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    },
  );
  const items = response.data.contents.map((item) => ({
    id: item.id,
    title: item.title,
    url: "/blogs/${item.id}",
    image:
      "https://pbs.twimg.com/card_img/2043467245570113536/peVChdf4?format=jpg&name=large",
  }));
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Image src={item.image} width={100} height={100} alt="" />
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  // const getMicroCMSItems = async () => {
  //   const response = await axios.get<MicrocmsResponse>(
  //     "https://3xqf61m0kn.microcms.io/api/v1/blogs",
  //     {
  //       headers: {
  //         "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
  //       },
  //     },
  //   );
  //   return response.data.contents.map((item) => ({
  //     id: item.id,
  //     title: item.title,
  //     image: item.eyecatch.url,
  //     url: "/blogs/${item.id}",
  //   }));
  // };

  // // const qiitaItems = await getQiitaItems();
  // const microCMSItems = await getMicroCMSItems();

  return (
    <div>
      <h1>Top Page</h1>
      <h2>Qiita Article</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <QiitaArticles />
      </Suspense>
      <h2>blog Article</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <MicroCMSArticles />
      </Suspense>
    </div>
  );
}
