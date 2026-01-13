import React from 'react';
import Categories from '../pages/Categories/Categories';
import { Outlet } from 'react-router-dom';
import AllRecipes from '../components/Shared/Allrecipes/AllRecipes';
import Navbar from '../components/layout/Navbar';

const RecipesLayout = () => {

    return (
        <div>
            <Navbar></Navbar>
            <AllRecipes></AllRecipes>
            <Outlet></Outlet>
        </div>
    );
};

export default RecipesLayout;