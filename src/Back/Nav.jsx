

import { NavLink } from "react-router-dom";
import Messages from "./Messages";

function Nav() {
  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <nav className="nav">
            <NavLink
              to="/admin/"
              className="nav-link"
              style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
            >
              Admin
            </NavLink>

            <NavLink
              to="/admin/book"
              className="nav-link"
              style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
            >
              Book Genre
            </NavLink>

            <NavLink
              to="/admin/books_info"
              className="nav-link"
              style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
            >
              About Books
            </NavLink>
          </nav>
        </div>
        
      </div>
    </div>
    <Messages/>
    </>
  );
}
export default Nav;
