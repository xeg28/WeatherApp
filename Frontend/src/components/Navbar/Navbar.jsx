import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="navbar">
      <div className="nav-content">
        <Link className={`link ${pathname === '/' ? 'active' : ''}`}
          to="/" >
          Form
        </Link>
        <Link className={`link ${pathname === '/database' ? 'active' : ''}`}
          to="/database">
          Database
        </Link>
      </div>
    </div>
  );
}

export default Navbar;