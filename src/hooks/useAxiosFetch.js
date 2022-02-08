import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.data,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        console.log(err.messsage);
        setFetchError(err.messsage);
        setData([]);
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      console.log("====================================");
      console.log("Clean Up Function");
      console.log("====================================");
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
