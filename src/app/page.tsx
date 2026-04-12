import axios from "axios";

type QiitaResponse = {
  id: string;
  title: string;
  url: string;
  image: string;
};

export default async function Home() {
  const getQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>(
      "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
      {
        headers: {
          Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
        },
      },
    );
    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      image:
        "https://pbs.twimg.com/card_img/2018833960445603840/CO8fJxkt?format=jpg&name=large",
    }));
  };

  const qiitaItems = await getQiitaItems();
  return (
    <div>
      <h1>Top Page</h1>
      <ul>
        {qiitaItems.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
