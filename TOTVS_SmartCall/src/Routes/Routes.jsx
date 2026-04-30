import { createBrowserRouter } from "react-router-dom";
import Layout from ".../pages/Layout";
import App from "../App";
import Sobre from "../Pages/Sobre";
import Empresa from "../Pages/Empresa"; 

export const router = createBrowserRouter([
   
    {
        path:'/',
        element:<Layout/>,
        children:[
            {index:true, element:<App/>},
            {path:'Sobre', element:<Sobre/>},
            {path:'Contatos', element:<Empresa/>}
        ]
    }
])