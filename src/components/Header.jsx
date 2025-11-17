import { Link, NavLink } from "react-router-dom";
import HeaderLogo from "../assets/images/logo-header.png";

export default function Header() {
  return (
    <header>
      <div className="header-wrapper">
        {/* Logo e nome shop */}
        <div className="col-left">
          <div>
            <img src={HeaderLogo} alt="logo teschio header" className="header-logo" />
          </div>
          <div className="title-wrapper">
            <h3>Mors Market</h3>
          </div>
        </div>

        {/* Navigazione home e catalogo */}
        <div className="col-center">
          <nav>
            <Link to="/">Home</Link>
            <NavLink to="/products">Catalogo</NavLink>
          </nav>
        </div>

        {/* Checkout */}
        <div className="col-right">
          <Link to="/checkout" className="cart-button">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>Carrello</span>
          </Link>
        </div>
      </div>
    </header>
  );
}