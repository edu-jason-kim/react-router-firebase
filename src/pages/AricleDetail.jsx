import { useParams } from "react-router"

function ArticleDetail () {
  // react-router의 useParams 함수를 통해서 전달받은 parameter 접근 가능
  const params = useParams()

  return <div>아티클 상세: {params.id}</div>
}

export default ArticleDetail
