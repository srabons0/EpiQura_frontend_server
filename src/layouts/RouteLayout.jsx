import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const RouteLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RouteLayout;