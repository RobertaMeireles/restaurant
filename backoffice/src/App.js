import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListUsers from './components/ListUsers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListRecipes from './components/recipe/ListRecipes';
import CreateRecipe from './components/recipe/CreateRecipe';

function App() {
  return (
    <div>
      <h5>My CRUD</h5>
      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to='/'>List User</Link>
          </li>
          <li>
            <Link to='user/create'>Create User</Link>
          </li>
          <li>
            <Link to='receitas'>Receitas</Link>
          </li>
          <li>
            <Link to='receita/criar'>Criar Receita</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<ListUsers/>} />
        <Route path="user/create" element={<CreateUser/>} />
        <Route path="user/:id/edit" element={<EditUser/>} />
        <Route path="receitas" element={<ListRecipes/>} />
        <Route path="receita/criar" element={<CreateRecipe/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
