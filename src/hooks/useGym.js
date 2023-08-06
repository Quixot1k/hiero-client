import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import URL from "../config/URL";

const useGym = (radius) => {
  const fetchGym = async () => {
    let data = []
    const res = await axios.get(`${URL}/search/gym?lat=${33}&lng=${-117}&radius=${radius}`)
    data = res.data
    return data;
  }
  return useQuery({
    queryKey: ["gym", radius],
    queryFn: fetchGym
  })
}

export default useGym;