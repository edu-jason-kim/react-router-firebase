import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// Context API: 하위 컴포넌트들에게 데이터를 공유하기 위한 기능
export const AuthContext = createContext();

/**
 * Context API 사용법:
 * 
 * 1. Provider를 만들고 하위 컴포넌트들에게 value 속성을 통해 데이터를 전달한다.
 * 2. 다른 컴포넌트에서 `useContext(AuthContext)` 형태로 context 값에 접근한다. (ex. Auth.jsx)
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 인증에 변화가 생겼을 때 user 정보를 업데이트하는 리스너
    // - Auth.jsx 컴포넌트에서 로그인/로그아웃 시 변경 이벤트를 감지하여 실행
    // - 인증에 변화가 발생할 때 `user` 상태를 변경하여, 참조하고 있는 하위 컴포넌트들 리렌더링 (ex. Home.jsx)
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {/* Provider 아래에 선언된 하위 컴포넌트들은 user 상태에 접근할 수 있음 */}
      {children}
    </AuthContext.Provider>
  );
};
