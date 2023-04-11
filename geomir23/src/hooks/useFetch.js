import { useEffect, useState } from "react";

export const useFetch = (url,  authToken) => {

    // Hook que podem personalitzar ....

    const [ refresh,setRefresh] = useState(false)
    const [state, setState] = useState({

        data: [],
        isLoading: true,
        error: ""
    })
  

    const preurl = 'https://backend.insjoaquimmir.cat/api'

    console.log(preurl+url)

    let headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken

        },
        method: "GET"
    }

    const reRender= () => {

        setRefresh(!refresh)

    }
    const getFetch = async () => {


        setState({ ...state, isLoading: true })

        try {

            const data = await fetch(preurl + url, headers)
            const resp = await data.json();

            if (resp.success == true) {
                               
                //console.log("useFetch correcte")
                setState({
                    data: resp.data,
                    isLoading: false,
                    error: ""
                })
            }
            else {
                setState({
                    data: [],
                    isLoading: false,
                    error: resp.message
                })


            }
        }
        catch  {
              setState({ data:[],isLoading:false, error:"Error de connexió"})
              console.log("S'ha produit un error")
        }


        

       
    }

    // getFetch();

    useEffect(() => {

        getFetch();
        console.log("--------------")
        //setRefresh(false);
        

      
    }, [refresh])

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        reRender: reRender
      
    };
}