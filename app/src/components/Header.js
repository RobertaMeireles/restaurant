import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider"
import {
    BarChart,
    ShoppingCartRounded,
  } from "@mui/icons-material"

function Header() {

  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    const toggleIcon = document.querySelector(".toggleMenu");
    toggleIcon.addEventListener("click", () => {
      document.querySelector(".rightMenu").classList.toggle("active");
    });
  }, []);

  return (
    <header>
      <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Papa_Gino%27s_Logo.png/800px-Papa_Gino%27s_Logo.png?20220303134705"
          alt="logo"
          className="logo"
      />

      <div className="shoppingCart">
          <ShoppingCartRounded className="cart" />
          <div className={`${!cart ? "noCartItem" : "cart_content"}`}>
            <p>{cart ? cart.length : ""}</p>
          </div>
      </div>

      <div className="toggleMenu">
          <BarChart className="toggleIcon" />
        </div>
    </header>
  )
}

export default Header