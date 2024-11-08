import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = 'articles'

const articleService = {
  createArticle () {
    const docRef = doc(db, COLLECTION_NAME, '1')
    setDoc(docRef, {
      title: '새로운 아티클',
      description: '테스트입니다.',
      category: 'news',
      date: '2024-11-08',
    })
  }
}

export default articleService
