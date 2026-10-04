import { useEffect, useState } from "react";

function useFetch(url) {
  const [apidata, setAPIdata] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const response = async () => {
      try {
        const response = await fetch(url);

        const data = await response.json();

        setAPIdata({
          data: data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setAPIdata({
          data: null,
          error: error,
          loading: false,
        });
      }
    };

    response();
  }, [url]);

  return apidata;
}

export default useFetch;
