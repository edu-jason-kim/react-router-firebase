import { useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthProvider";

function Home() {
  // Context API를 통해서 user 정보 획득
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <h1>홈입니다</h1>

      {/* `&&` 연산자를 통해서 user 정보가 있는 경우, 유저 이름 노출 */}
      {user && <p>hello {user.displayName}!</p>}
    </div>
  );
}

export default Home;
