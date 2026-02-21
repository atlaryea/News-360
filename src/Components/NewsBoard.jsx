import { useEffect } from "react";
import NewsItem from "./NewsItem";
import { useState } from "react";

const NewsBoard = ({category}) => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let url = `/api/news?category=${category}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    console.error("API Error:", data);
                    setArticles([]);
                }
            })
            .catch(error => console.error("Fetch error:", error))
    }, [category]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {articles.map((news, index) => {
        return <NewsItem key={index} title={news.title} description={news.description} url={news.url} src={news.urlToImage} />
      })}
    </div>
  )
}

export default NewsBoard
