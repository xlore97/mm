import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../assets/images/logo-header.png";
import "./Header.css";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <div className="header-wrapper">
        <div className="col-left">
          <Link to="/">
            <img src={HeaderLogo} alt="logo" className="header-logo" />
            <h3>Mors Market</h3>
          </Link>
        </div>

        <div className="col-center">
          <nav>
            <Link to="/">Home</Link>
            <NavLink to="/products">Catalogo</NavLink>
          </nav>
        </div>

        <div className="col-right">
          <NavLink to="/checkout" className="cart-button">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
