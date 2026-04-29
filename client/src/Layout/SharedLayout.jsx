import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../components/NavBar';
export default function SharedLayout() {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  );
}
