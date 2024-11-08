import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import articleService from "../database/articleService";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // articleService.getArticles은 외부 데이터 fetch 로직으로 promise를 반환하는 비동기 함수.
    // then을 통해서 promise 값을 기다리고, 값이 도착할 때 실행할 함수를 정의할 수 있다.
    articleService.getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  const handleFilterChange = (e) => {
    setSearchParams({
      filter: e.target.value,
    });
  };

  const currentFilter = searchParams.get("filter") || "all";

  const filteredArticles = articles.filter((article) => {
    if (currentFilter === "all") return true;
    return article.category === currentFilter; // 'news'
  });

  return (
    <div>
      <Header />
      <h1>아티클 홈</h1>

      <select value={currentFilter} onChange={handleFilterChange}>
        <option value="all">전체</option>
        <option value="news">News</option>
        <option value="no normal pick">No Normal Pick</option>
      </select>

      <ul>
        {filteredArticles.map((article) => {
          return (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <div>{article.date}</div>
              <div>카테고리: {article.category}</div>
              <Link to={`/articles/${article.id}`}>바로가기</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;
