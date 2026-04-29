import React from 'react';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from './SharedLayout';
import Home from '../pages/Home';
import Events from '../pages/Events';
import NotFound from '../pages/NotFound';
import DetailedEvent from '../pages/DetailedEvent';
import EditEvents from '../pages/EditEvents';
import Login from '../pages/Login';
export default function MainLayout() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element = {<Home/>}/>
                    <Route path="/login" element = {<Login/>}/>
                    <Route path="Events" element = {<Events/>}/>
                    <Route path="Events/:id" element = {<DetailedEvent/>}/>
                    <Route path="Events/:id/edit" element = {<EditEvents/>}/>
                </Route>
                 <Route path="*" element = {<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </>
  );
}
