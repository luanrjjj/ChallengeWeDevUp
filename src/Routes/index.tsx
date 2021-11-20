import { Routes, Route } from "react-router-dom";

import {Home} from "../pages/Home/index"
import Cart from '../pages/Cart/index'

const RoutesApp = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="cart" element={<Cart/>}/>
    </Routes>
  );
};

export default RoutesApp;