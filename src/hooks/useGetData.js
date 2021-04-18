import { useEffect, useState } from "react";
import getData from "../services/dataService";

export default function useGetData() {
  const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setIsDataLoaded(true);
    });
  }, []);

  return { data, isDataLoaded };
}
