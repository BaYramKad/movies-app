import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './app-style.css';
import { App } from './App';

export const MyContext = createContext([])
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);
