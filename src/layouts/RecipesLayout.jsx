import React from 'react';
import Categories from '../pages/Categories/Categories';
import { Outlet } from 'react-router-dom';
import AllRecipes from '../components/Shared/Allrecipes/AllRecipes';
import Navbar from '../components/layout/Navbar';
import AllBestSellers from '../pages/Recipes/AllBestSellers';
import AllSpecialOffers from '../pages/Recipes/AllSpecialOffers';
import Footer from '../components/layout/Footer';
import TopFoodList from '../pages/Foods/TopFoodList';
import TopFood from '../pages/Recipes/TopFood';
import ShoppingCart from '../components/ui/ShoppingCart';

const RecipesLayout = () => {

    return (
        <div className='relative'>
            <ShoppingCart></ShoppingCart>
            <Navbar></Navbar>
            <AllRecipes></AllRecipes>
            <Outlet></Outlet>
            <TopFood></TopFood>
            <AllBestSellers></AllBestSellers>
            <AllSpecialOffers></AllSpecialOffers> 
            <Footer></Footer>
        </div>  
    );
};

export default RecipesLayout;