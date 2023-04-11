import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../userContext';

export const Header = () => {

    let { authToken,setAuthToken, email,setEmail } = useContext(UserContext)
    let [ usuari,setUsuari] = useState("")
    let [ roles, setRoles] = useState([]);
    

    useEffect(() => {
      
        fetch ("https://backend.insjoaquimmir.cat/api/user",{
        
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '  + authToken,
           //"Access-Control-Allow-Origin": "*" 
  
       },
       method: "GET",
       //body: JSON.stringify({email: email, password: password})
       })
       .then ( data => data.json() )
       .then (resposta => { 
           
               
               if (resposta.success == true )
               {
                   console.log(resposta);
                   setUsuari(resposta.user.name)
                   setEmail(resposta.user.email)
                   setRoles(resposta.roles)
                 
               }
               
           } ) 
       .catch((data) => {
           
       })
        
      
      
    }, [])

   


    
    const logout = (e)=> {

        e.preventDefault();


        fetch ("https://backend.insjoaquimmir.cat/api/logout",{
        
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '  + authToken,
            //"Access-Control-Allow-Origin": "*" 
   
        },
        method: "POST",
        //body: JSON.stringify({email: email, password: password})
        })
        .then ( data => data.json() )
        .then (resposta => { 
            
                
                if (resposta.success == true )
                {
                    console.log(resposta); 
                    setAuthToken("");
                  
                }
                
            } ) 
        .catch((data) => {
            
        })


    }
  return (
      <>
  
      <nav className="bg-indigo-400 px-4 p-4">
      <div className="flex items-center justify-between">

          <div className="flex items-center">
          <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs">GEOMIR</div>


              <div className="pl-9 ">
                  <Link to="/places">Places </Link>  
                  <Link to="/posts">Posts </Link>  
                  <Link to="/todos">ToDos </Link>  
                  <Link to="/about">About </Link>  

              </div>
          </div>
          <div>
              { usuari } ( 
              { roles.map ((v)=> ( <span key={v}> {v} </span>))}) - 
              <a className="text-orange-800" onClick={logout} href="">Logout</a>
              
          </div>

      </div>

      </nav>

      {/* <nav className="bg-indigo-500 p-3 ">

    <div className="flex justify-evenly text-2xl text-white">
        <div>Llistar</div>
        <div>Afegir</div>
    </div>
</nav> */}
 
     
      </>    
  )
}
