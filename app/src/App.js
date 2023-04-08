import React  from 'react'
import { useEffect, useState } from "react"
import services from "../src/services/user.service"
import { useStateValue } from "./components/StateProvider"
import './App.css';
import Header from "./components/Header"
import MenuCard from "./components/MenuCard"
import ItemCard from './components/ItemCard'
import CartItem from './components/CartItem'
import { ChevronRightRounded } from "@mui/icons-material"
let order = [];

function App() {

  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])

  const [{ cart, total }, dispatch] = useStateValue();

  const getCategories = () => {
       services.getAll(`/categories`)
       .then(response => {
          setCategories(response.data.message)
       })
       .catch(error => {
           console.error(error);
           alert(`Um problema ocorreu. Tente mais tarde.`)
       })
   }

   const getAllRecipes = () => {
    services.getAll(`/recipes`)
    .then(response => {
       setRecipes(response.data.message)
    })
    .catch(error => {
        console.error(error);
        alert(`Um problema ocorreu. Tente mais tarde.`)
    })
  }

  const filterRecipe = (categoryId) => {
    services.getAll(`/recipes/${categoryId}`)
    .then(response => {
        setRecipes(response.data.message)
    })
    .catch(error => {
        console.error(error);
        alert(`Um problema ocorreu. Tente mais tarde.`)
    })
  };

  const checkOut = () => {
    cart.forEach(element => {
      order.push(
        {
            "id": element.id,
            "quantity": element.quantity
        }
    )
    });
    services.create('/orders/add', 
    {
      tabletId: 1,
      recipes: order
    })
    .then((res) => {
        if (res) {
            alert(`Pedido Realizado com sucesso!`)
            order.pop()
            window.location.reload(true);
        }
    }).catch((error) => {
        console.error(error)
        alert(`Um problema ocorreu. Tente mais tarde.`)
    })
  }

   useEffect (() => {
      getCategories()
      getAllRecipes()

      // MenuCard Active toggle
      const menuCard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard")

      function setMenuCardActive() {
        menuCard.forEach((n) => n.classList.remove("active"));
        this.classList.add("active")
      }
      menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));

   }, [cart]);

  return (
    <div className="App">
      {/* header */}
      <Header></Header>
      {/* Main Container */}
      <main>
        {/* Banner */}
        <div className="mainContainer">
          <div className="banner">
          </div>
          {/* cards */}
          <div className="dishContainer">
              <div className="menuCard">
              <div className="subMenuContianer">
              <h3>Categorias</h3>
              <div className="viewAll" onClick={() => getAllRecipes()}>
              <p>View All</p>
              <i>
                <ChevronRightRounded />
              </i>
            </div>
          </div>
              </div>
              <div className="rowContainer">
              {categories.map((category) => 
              <div key={category.id} onClick={() => filterRecipe(category.id)}>
                  <MenuCard name={category.name}/>
              </div>
              )}
              </div>
          </div>
          <div className='menu'>
            <h3>Menu</h3>
            </div>
          <div className="dishItemContainer">
          {recipes.map((recipe,key) => 
            <ItemCard key={key} 
              itemId={recipe.id}
              name={recipe.name} 
              imgSrc={"http://project-tcc.test/restaurant-api/public/assets/images/" + recipe.image} 
              description={recipe.description}
              price={recipe.price}
            />
          )}
          </div>
      </div>
      <div className="rightMenu">
        {!cart ? (
          <div className='cartbox'>
            <p>Sem pedidos no carrinho</p>
          </div> 
        ) : (
          <div className="cartCheckOutContianer">
          <div className="cartContainer cartbox">
          <div className='cartbox'>
            <p>Carrinho</p>
            <div className="cartItems">
              {cart && cart.map((data) => (
               <CartItem 
                key={data.id}
                itemId={data.id}
                name={data.name}
                imgSrc={data.imgSrc}
                price={data.price}
              />
              ))}
  	        </div>
          </div>
          <button className="checkOut" onClick={() => checkOut()}>Criar Pedido</button>
          </div>
        </div>
        ) 
        }
      </div>
      </main>
    </div>
  );
}

export default App;
