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
          <img src={HeaderLogo} alt="logo" className="header-logo" />
          <h3>Mors Market</h3>
        </div>

        <div className="col-center">
          <nav>
            <Link to="/">Home</Link>
            <NavLink to="/products">Catalogo</NavLink>
          </nav>
        </div>

        <div className="col-right">
          <Link to="/checkout" className="cart-button">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>Carrello</span>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
