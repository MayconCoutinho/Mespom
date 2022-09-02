import { goToFeedPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const LoginToken = () => {

  const navigate = useNavigate();

  const token = window.localStorage.getItem('token')

  useEffect(() => {

    if(token != null){
        goToFeedPage(navigate)
    } 

  },[token])

} 