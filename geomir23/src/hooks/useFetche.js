import { useEffect, useState } from 'react';

export function useFetche (initialUrl, initialOptions) {

  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ refresh, setRefresh] = useState(false)


  const reRender = ()=> {

    setRefresh(!refresh)
  }

  useEffect(() => {
    setIsLoading(true);
    setError("");

    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        console.log(json)
        setData(json);
      } catch (e) {
        setError(e);
      }
            setIsLoading(false);
    }
    
    fetchData();
  }, [url, options,refresh]);

  return { data, error, isLoading, setUrl, setOptions,reRender };
}