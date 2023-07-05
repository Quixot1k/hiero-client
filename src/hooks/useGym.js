import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useGym = (radius) => {
  const fetchGym = async () => {
    let data = []
    const res = await axios.get(`http://127.0.0.1:10001/search/gym?lat=${33}&lng=${-117}&radius=${radius}`)
    data = res.data
    return data;
  }
  return useQuery({
    queryKey: ["gym", radius],
    queryFn: fetchGym
  })
}

export default useGym;