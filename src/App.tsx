import React from 'react';
import RoutesApp from './Routes/index'
import {BrowserRouter} from 'react-router-dom';
import { CartProvider } from "./hooks/useCart";

import 'antd/dist/antd.css';
import GlobalStyles from "./styles/global";

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
    <GlobalStyles/>
    <RoutesApp/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
