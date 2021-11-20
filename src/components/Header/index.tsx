import React from "react";
import { Link } from "react-router-dom";
import { Container, Cart } from "./styles";
import { useCart } from "../../hooks/useCart";
import { MdShoppingBasket } from "react-icons/md";

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <Link to="/">
        <span className="Title">RentCar</span>
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My Cart</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} items`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
