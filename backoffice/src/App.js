import React from 'react'
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
import ListIngredients from './views/ingredient/ListIngredients'
import CreateIngredient from './views/ingredient/CreateIngredient'
import UpdateIngredient from './views/ingredient/UpdateIgredient'
import DeleteIngredient from './views/ingredient/DeleteIngredient'
import ListRecipes from './views/recipe/ListRecipes'
import CreateRecipe from './views/recipe/CreateRecipe'
import Login from './views/Login'
import Home from './views/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
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
        <Route path="ingredientes" element={<ListIngredients/>} />
        <Route path="ingrediente/criar" element={<CreateIngredient/>} />
        <Route path="ingrediente/update/:id" element={<UpdateIngredient/>} />
        <Route path="ingrediente/deletar/:id" element={<DeleteIngredient/>} />
        <Route path="receitas" element={<ListRecipes/>} />
        <Route path="receita/criar" element={<CreateRecipe/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




