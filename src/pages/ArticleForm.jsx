import { useEffect, useState } from "react";
import Header from "../components/Header";
import { v4 } from "uuid";
import articleService from "../database/articleService";
import { useNavigate, useParams } from "react-router-dom";

function ArticleForm() {
  // article 생성을 위한 값
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "news", // 기본값이 'news'
  });

  const params = useParams();
  const articleId = params.id; // 있을수도 있고, 없을수도 있음
  const isEditing = !!articleId; // !! 연산자로 값을 boolean값으로 변환 가능

  useEffect(() => {
    if (!articleId) return;

    articleService.getArticle(articleId).then((article) => {
      // form에 기존 article data
      setFormData({
        title: article.title,
        description: article.description,
        category: article.category,
      });
    });
  }, [articleId]);

  // Link 클릭 형태가 아닌, 함수 호출로 페이지 이동할 수 있게 함
  const navigate = useNavigate();

  // input, select 입력할 때 실행되는 함수
  const handleChange = (e) => {
    // e.target.name에서 form 안의 각 input을 식별할 수 있음
    const name = e.target.name;
    const value = e.target.value;

    // set 함수를 callback 형태로 쓰면, 세팅하기 이전 값 `prev` 접근 가능
    // callback에서 반환되는 값을 새로운 값으로 설정
    setFormData((prev) => {
      return {
        ...prev, // object spread operator: 객체의 모든값을 할당
        [name]: value,
      };
    });
  };

  // 제출할 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      articleService.updateArticle(articleId, formData);
      alert(`아티클이 ${수정생성}됐습니다.`);

      navigate(`/articles/${articleId}`);
    } else {
      // uuid 개념: https://docs.tosspayments.com/resources/glossary/uuid
      const id = v4();

      // yyyy. MM. dd 포맷의 날짜
      const date = new Date().toLocaleDateString();

      const article = { ...formData, id, date };
      articleService.createArticle(article);

      alert(`아티클이 ${수정생성}됐습니다.`);

      // article 생성 후 articles 페이지로 redirect
      navigate("/articles");
    }
  };

  const 수정생성 = isEditing ? "수정" : "생성";

  return (
    <div>
      <Header />
      <h1>아티클 {수정생성}</h1>

      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="news">NEWS</option>
            <option value="no normal pick">No Normal Pick</option>
          </select>
        </div>

        {/* 내용 */}
        <div>
          <label htmlFor="description">내용</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={handleChange}
            value={formData.description}
          />
        </div>

        {/* 수정/생성 버튼 */}
        <button type="submit">{수정생성}하기</button>
      </form>
    </div>
  );
}

export default ArticleForm;
