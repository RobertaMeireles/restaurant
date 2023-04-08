import React, { useEffect, useState } from "react"
import { actionType } from "./reducer"
import { useStateValue } from "./StateProvider"
import { AddRounded, RemoveRounded } from "@mui/icons-material"
let cartItems = [];

export default function CartItem({ itemId, name, imgSrc, price }) {

  const [qty, setQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    cartItems = cart;
    setItemPrice(parseInt(qty) * parseFloat(price));
  }, [qty]);

  const updateQty = (action, id) => {
    if (action == "add") {
        setQty(qty + 1)
        cartItems.forEach(element => {
            if(element.id == id) {
                element.quantity++
            }
        });
    } else {
        if (qty == 1) {
            cartItems.pop(id)
            dispatch({
              type: actionType.SET_CART,
              cart: cartItems,
            });
          } else {
            setQty(qty - 1);
            cartItems.forEach(element => {
                if(element.id == id) {
                    element.quantity--
                }
            });
          }
        }
    }

  return (
    <div className="cartItem">
        <div className="imgBox">
            <img src={imgSrc} alt={name} />
        </div>
        <div className="itemSection">
            <p className="itemName">{name}</p>
            <div className="itemQuantity">
                <span>x {qty}</span>
                <div className="quantity">
                    <RemoveRounded 
                        className="itemRemove"
                        onClick={() => updateQty("remove", itemId)}
                    />
                    <AddRounded
                        className="itemAdd"
                        onClick={() => updateQty("add", itemId)}
                    />
                </div>
            </div>
        </div>
        <p className="itemPrice">
            <span className="dolorSign">R$ </span>{" "}
            <span className="itemPriceValue">{itemPrice}</span>
        </p>
    </div>
  )
}
