import { signInWithPopup, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { auth, googleProvider } from "../firebase";

function Auth() {
  // Context API를 통해서 user 정보 획득
  const { user } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      {/* 삼항연사자를 통해서 조건부로 로그인/로그아웃 버튼 노출 */}
      {user ? (
        // 사용자 정보가 있다면, 로그아웃 버튼 노출
        <button onClick={handleLogout}>Logout</button>
      ) : (
        // 사용자 정보가 없다면, 로그인 버튼 노출
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default Auth;
