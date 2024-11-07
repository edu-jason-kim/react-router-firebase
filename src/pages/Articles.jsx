import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import articles from "../data/articles";

function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();

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
