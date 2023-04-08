import { ChevronRightRounded } from "@mui/icons-material";
import React from "react";

// function MenuCard({ imgSrc, name }) {
function MenuCard({ name, isActive }) {
  return (
    <div className={`rowMenuCard ${isActive ? `active` : ``}`}>
      <h3>{name}</h3>
    </div>
  );
}

export default MenuCard;