import React from 'react'
import useAuth from "./services/useAuth";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListOrders from './views/order/ListOrder'
import UpdateOrders from './views/order/UpdateOrder'
import ListCategories from './views/category/ListCategories'
import CreateCategory from './views/category/CreateCategory'
import UpdateCategory from './views/category/UpdateCategory'
import DeletarCategory from './views/category/DeleteCategory'
import ListUsers from './views/user/ListUsers'
import CreateUser from './views/user/CreateUser'
import UpdateUser from './views/user/UpdateUser'
import DeleteUser from './views/user/DeleteUser'
import ListTablets from './views/tablet/ListTablet'
import DeleteTablet from './views/tablet/DeleteTablet'
import ListIngredients from './views/ingredient/ListIngredients'
import CreateIngredient from './views/ingredient/CreateIngredient'
import UpdateIngredient from './views/ingredient/UpdateIgredient'
import DeleteIngredient from './views/ingredient/DeleteIngredient'
import ListRecipes from './views/recipe/ListRecipes'
import CreateRecipe from './views/recipe/CreateRecipe'
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/notFound'

function App() {

  const Private = ({Item}) => {
    const signed = useAuth();
    console.log(signed)
    if(signed) {
      return <Item/>
    } else {
      return <Login/>
    }
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route index element={<Login/>} />
        <Route path="home" element={<Home/>} />
        <Route path="pedidos" element={<ListOrders/>} />
        <Route path="pedido/update/:id" element={<UpdateOrders/>} />
        <Route path="categorias" element={<ListCategories/>} />
        <Route path="categoria/criar" element={<CreateCategory/>} />
        <Route path="categoria/update/:id" element={<UpdateCategory/>} />
        <Route path="categoria/deletar/:id" element={<DeletarCategory/>} />
        <Route path="usuarios" element={<ListUsers/>} />
        <Route path="usuario/criar" element={<CreateUser/>} />
        <Route path="usuario/update/:id" element={<UpdateUser/>} />
        <Route path="usuario/deletar/:id" element={<DeleteUser/>} />
        <Route path="tablets" element={<ListTablets/>} />
        <Route path="tablet/deletar/:id" element={<DeleteTablet/>} />
        <Route path="ingredientes" element={<ListIngredients/>} />
        <Route path="ingrediente/criar" element={<CreateIngredient/>} />
        <Route path="ingrediente/update/:id" element={<UpdateIngredient/>} />
        <Route path="ingrediente/deletar/:id" element={<DeleteIngredient/>} />
        <Route path="receitas" element={<ListRecipes/>} />
        <Route path="receita/criar" element={<CreateRecipe/>} />
        <Route path="*" element={<NotFound/>} /> */}

        <Route index element={<Login/>} />
        <Route path="home" element={<Private Item={Home} />} />
        <Route path="pedidos" element={<Private Item={ListOrders} />} />
        <Route path="pedido/update/:id" element={<Private Item={UpdateOrders} />} /> 
        <Route path="categorias"  element={<Private Item={ListCategories} />} /> 
        <Route path="categoria/criar" element={<Private Item={CreateCategory} />} /> 
        <Route path="categoria/update/:id" element={<Private Item={UpdateCategory} />} />
        <Route path="categoria/deletar/:id" element={<Private Item={DeletarCategory} />} />
        <Route path="usuarios" element={<Private Item={ListUsers} />} />
        <Route path="usuario/criar" element={<Private Item={CreateUser} />} />
        <Route path="usuario/update/:id" element={<Private Item={UpdateUser} />} />
        <Route path="usuario/deletar/:id" element={<Private Item={DeleteUser} />} /> 
        <Route path="tablets"  element={<Private Item={ListTablets} />} />
        <Route path="tablet/deletar/:id" element={<Private Item={DeleteTablet} />} />
        <Route path="ingredientes"  element={<Private Item={ListIngredients} />} />
        <Route path="ingrediente/criar" element={<Private Item={CreateIngredient} />} />
        <Route path="ingrediente/update/:id"  element={<Private Item={UpdateIngredient} />} />
        <Route path="ingrediente/deletar/:id" element={<Private Item={DeleteIngredient} />} />
        <Route path="receitas" element={<Private Item={ListRecipes} />} />
        <Route path="receita/criar" element={<Private Item={CreateRecipe} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




