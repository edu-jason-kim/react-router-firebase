import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = 'articles'

const articleService = {
  /**
   * 데이터 쓰기
   * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#add_a_document
   */
  createArticle (article) {
    /**
     * firestore 문법:
     * - doc의 참조값을 생성하여, ("여기에 데이터 넣을거에요"라고 가르킨다고 생각하면 됨)
     * - setDoc 함수를 통해 해당 doc에 데이터를 할당한다.
     */
    const docRef = doc(db, COLLECTION_NAME, article.id)
    setDoc(docRef, article)
  },

  /**
   * 데이터 읽기
   * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko#get_multiple_documents_from_a_collection
   */
  async getArticles () {
    /**
     * firestore 문법:
     * - data를 어떻게 query 할건지 작성 (where 등 firestore 가 지원하는 여러 query 함수를 사용할 수 있음)
     * - query 예시: https://firebase.google.com/docs/firestore/query-data/queries?hl=ko
     */
    const q = query(
      collection(db, COLLECTION_NAME)
    )

    /**
     * firestore 문법:
     * - getDocs로 호출 시점의 query 결과의 snapshot을 만들고 (readonly data로 가져왔다 생각하면 됨)
     * - docs안의 각 doc에 대한 snapshot에서부터 data 함수를 통해 실제 데이터를 꺼내온다.
     */
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => {
      return doc.data()
    })
  },

  async getArticle (articleId) {
    const articleRef = doc(db, COLLECTION_NAME, articleId)
    const articleSnapshot = await getDoc(articleRef)

    return articleSnapshot.data()
  },

  async updateArticle (articleId, updatedArticle) {
    const articleRef = doc(db, COLLECTION_NAME, articleId)
    await updateDoc(articleRef, updatedArticle)
  }
}

export default articleService
