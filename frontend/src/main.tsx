import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Expenses from './pages/Expenses.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path={"/"}/>
                <Route element={<Expenses />} path={"/expenses"}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)