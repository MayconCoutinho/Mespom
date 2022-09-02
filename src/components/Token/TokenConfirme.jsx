
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/coordinator";


export const ConfirmandoToken = () => {

  const navigate = useNavigate();

  const token = window.localStorage.getItem('token')

  useEffect(() => {

    if(token === null){
        goToLoginPage(navigate)
    } 

  },[token])

}