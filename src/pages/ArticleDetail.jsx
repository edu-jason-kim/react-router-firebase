import { useEffect, useState } from "react";
import { useParams } from "react-router";
import articleService from "../database/articleService";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function ArticleDetail() {
  // react-router의 useParams 함수를 통해서 전달받은 parameter 접근 가능
  const params = useParams();
  const articleId = params.id;

  // 1. 데이터 값을 정의
  const [article, setArticle] = useState(null);

  // 2. 외부 데이터를 useEffect에서 호출, 데이터 세팅
  useEffect(() => {
    articleService.getArticle(articleId).then((article) => {
      setArticle(article);
    });
  }, [articleId]);

  // article이 null이면 로딩중 표시
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <h1>{article.title}</h1>
      <div>{article.category} | {article.date}</div>
      <div>{article.description}</div>

      <Link to={`/articles/edit/${article.id}`} >수정하기</Link>
    </div>
  );
}

export default ArticleDetail;
