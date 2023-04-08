import React, { useEffect, useState } from "react";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
import { AddRounded } from "@mui/icons-material";
let cartData = [];

function ItemCard({ itemId, name , description, price, imgSrc }) {

  const [isCart, setCart] = useState(null);
  const [{}, dispatch] = useStateValue();

  const myItem = (id,name,imgSrc,price) => {
    if (id, name, price){
        setCart(
            {
                id: id,
                name: name,
                imgSrc: imgSrc,
                price: price,
                quantity: 1
            }
        )
    }
  }

  useEffect(() => {
    if (isCart) {
      cartData.push(isCart)
      dispatch({
        type: actionType.SET_CART,
        cart: cartData,
      });
    }
  }, [isCart]);

  return (
    <div className="itemCard" id={itemId}>
        <div className="imgBox">
            <img src={imgSrc} alt={name}/>
        </div>
        <div className="itemContent">
            <h3>{name}</h3>
            <p>{description}</p>
            <div className='bottom'>
                <p className="price">
                <span>R$ </span>
                {price}
                </p>
                <i className="addToCart"
                    onClick={() => {
                    myItem(itemId,name,imgSrc,price);
                    }}
                >
                <AddRounded />
                </i>
            </div>

        </div>
    </div>
  )
}

export default ItemCard