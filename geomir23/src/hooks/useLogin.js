import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { useFetch } from "./useFetch";

export const useLogin = () => {

    let { usuari, setUsuari, authToken, setAuthToken,setEmail } = useContext(UserContext);
    
    //const [login,setLogin] = useState({ email:"",password:""})
    const [error,setError] = useState("")


    const check_authToken = async () => {

        let authTokenTemp =  JSON.parse(localStorage.getItem("authToken")) || "" 

        //let authTokenTemp = ""
        if (authTokenTemp == "") setAuthToken("")
        else{
            // Si hi ha token definit a localstorage, fem una crida a user
            // Per a veure si el token és vàlid 
            // De no ser-ho, l'API tornarà error
            const predata = await fetch ("https://backend.insjoaquimmir.cat/api/user",{
                    headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '  + authTokenTemp,
                             },
                    method: "GET",
           
           })
           const data = await predata.json();
           // Comprovem si l'usuari té un token vàlid             
           if (data.success == true ) { 
                setAuthToken (authTokenTemp); 
                setEmail(data.user.email)
                
                console.log("No ha superat el check auth") }
           else setAuthToken("")
           

        }

    }

    
    const doLogin = async (login) => {

        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(login),
            });
            const resposta = await data.json();
            if (resposta.success == true) {
                localStorage.setItem('authToken',JSON.stringify(resposta.authToken))
              setAuthToken(resposta.authToken);
              setEmail(login.email)

            } else {
              setError(resposta.message);
            }
          } catch {
            setError("Network error");
          }

    }


    useEffect(()=>{

        check_authToken()

    }, [])





    return { doLogin, error, setError}
}
