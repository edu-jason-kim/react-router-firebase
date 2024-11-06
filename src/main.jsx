import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Articles from './pages/Articles.jsx'
import ArticleDetail from './pages/AricleDetail.jsx'

// Path별 router를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/articles',
    element: <Articles />
  },
  {
    // `:` 기호로 동적 parameter를 제공할 수 있다.
    path: '/articles/:id',
    element: <ArticleDetail />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* React Router의 기능을 제공하는 Provider 컴포넌트 */}
    <RouterProvider router={router} />
  </StrictMode>,
)
