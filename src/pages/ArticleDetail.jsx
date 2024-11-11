import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import articleService from "../database/articleService";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";

function ArticleDetail() {
  const navigate = useNavigate();

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

  const handleDelete = useCallback(() => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      articleService.deleteArticle(articleId);
      alert("삭제되었습니다.");
      navigate("/articles");
    }
  }, [articleId]);

  // article이 null이면 로딩중 표시
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <h1>{article.title}</h1>
      <div>
        {article.category} | {article.date}
      </div>
      <div>{article.description}</div>
      <Link to={`/articles/edit/${article.id}`}>수정하기</Link>

      <button onClick={handleDelete}>삭제하기</button>

      <hr />

      <ChatRoom articleId={articleId} />

    </div>
  );
}

export default ArticleDetail;
