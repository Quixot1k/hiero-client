import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";
import URL from "../config/URL";

const useClient = () => {
  const userId = useStore((state) => state.userId);
  const fetchClient = async () => {
    let data = []
    const res = await axios.get(`${URL}/client/getall/${userId}`)
    data = res.data
    return data.filter((clientObj) => {
      return clientObj.clientId !== 0;
    });
  }
  return useQuery({
      queryKey: ["client"],
      queryFn: fetchClient,
    }
  )
}

export default useClient;