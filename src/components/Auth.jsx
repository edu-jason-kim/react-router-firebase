import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../firebase"
import { useEffect, useState } from "react"

function Auth () {
  // user라고 하는 상태 값을 관리할 예정
  const [user, setUser] = useState(null) // 기본값: null <- 로그인 안된 상태

  const handleGoogleLogin = () => {
    // TODO: 구글 로그인 구현
    signInWithPopup(auth, googleProvider)
  }

  const handleLogout = () => {
    signOut(auth)
  }

  // 최초 렌더링 시 1회 실행
  useEffect(() => {
    // 인증 상태 변경 리스너
    // 인증에 변화가 생겼을 때 user 정보를 업데이트한다.
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return <div>

    { user 
    
      ?

      <div>
        <span>Hello, {user.displayName}!</span>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      :
    
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    }

  </div>
}

export default Auth
