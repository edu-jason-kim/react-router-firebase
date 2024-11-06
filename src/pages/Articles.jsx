import { Link, useSearchParams } from 'react-router-dom'
import articles from '../data/articles'

function Articles () {
  // useSearchParams 훅을 사용하여 search params에 접근 (`?filter=news`와 같은 쿼리스트링)
  const [searchParams, setSearchParams] = useSearchParams()
  
  const handleFilterChange = (e) => {
    // select가 변경 될때마다 search params의 filter 값 변경
    setSearchParams({
      filter: e.target.value
    })
  }

  // or 연산자를 통해 search params의 filter 값이 없을 경우 'all'로 설정
  const currentFilter = searchParams.get('filter') || 'all'

  return <div>
    <h1>아티클 홈</h1>

    <select
      // select의 값을 search params의 filter 값으로 설정
      value={currentFilter}

      // select가 변경 될때마다 handleFilterChange 함수 호출
      onChange={handleFilterChange}
    >
      {/* option의 value의 값이 handleFilterChange 함수로 전달된다. */}
      <option value="all">전체</option>
      <option value="news">News</option>
      <option value="no normal pick">No Normal Pick</option>
    </select>

    <ul>
      {/* 배열의 `.map` 메서드를 통해 반복하며 컴포넌트 렌더링 */}
      {articles.map((article) => {

        // react에서 배열의 각 요소를 렌더링할 때는 key prop을 필수로 사용해야 한다.
        return <li key={article.id}>
          <h2>{article.title}</h2>
          <div>{article.date}</div>
          <div>카테고리: {article.category}</div>
          {/* Link 컴포넌트로 페이지 라우팅 */}
          <Link to={`/articles/${article.id}`}>바로가기</Link>
        </li>
      })}
    </ul>
  </div>
}

export default Articles
