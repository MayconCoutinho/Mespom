import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import CadastroPage from "../pages/CadastroPage/CadastroPage.jsx";
import FeedPage from "../pages/FeedPage/FeedPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import PostPage from "../pages/PostPage/PostPage.jsx";

export const Router = () => {

    return(
        <BrowserRouter>
        <Routes>
            <Route index element = {<LoginPage/>} />
            <Route path= "*" element = {<ErrorPage/>} />
            <Route path= "CadastroPage" element = {<CadastroPage/>} />
            <Route path= "FeedPage" element = {<FeedPage/>} />
            <Route path= "LoginPage" element = {<LoginPage/>} />
            <Route path= "PostPage" element = {<PostPage/>} />
        </Routes>
      </BrowserRouter>

    )
}