import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import "./styles.css";
import {Provider} from "react-redux";
import store from "./redux/store";

const App = lazy(()=> import('./app'));

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
    <Provider store={store}>
    <App />
</Provider>);

