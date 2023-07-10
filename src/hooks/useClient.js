import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";

const useClient = () => {
  const userId = useStore((state) => state.userId);
  const fetchClient = async () => {
    let data = []
    const res = await axios.get(`http://localhost:10001/client/getall/${userId}`)
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