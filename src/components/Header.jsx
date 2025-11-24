import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../assets/images/logo-header.png";
import "./Header.css";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <div className="header-wrapper">
        {/* COL-LEFT: LOGO E NOME */}
        <div className="col-left">
          <Link to="/">
            <img src={HeaderLogo} alt="logo" className="header-logo" />
            <h3 className="desktop-only">Mors Market</h3>
          </Link>
        </div>

        {/* COL-CENTER: NAV LINKS */}
        <div className="col-center">
          <nav className="nav-links">
            {/* HOME */}
            <Link to="/" className="home-link desktop-only">
              Home
            </Link>
            <Link
              to="/"
              className="home-icon mobile-only material-symbols-outlined"
            >
              home
            </Link>

            {/* CATALOGO */}
            <NavLink to="/products" className="catalog-link desktop-only">
              Catalogo
            </NavLink>
            <NavLink
              to="/products"
              className="catalog-icon mobile-only material-symbols-outlined"
            >
              view_list
            </NavLink>
          </nav>
        </div>

        {/* COL-RIGHT: CARRELLO */}
        <div className="col-right">
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `cart-button ${isActive ? "active" : ""}`
            }
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
