import { Link } from "react-router-dom";
import Auth from "./Auth";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Link to="/">Logo</Link>
      <Link to="/articles">아티클</Link>
      <Link to="/articles/new">new</Link>

      <div style={{ marginLeft: "auto" }}>
        <Auth />
      </div>
    </header>
  );
}

export default Header;
