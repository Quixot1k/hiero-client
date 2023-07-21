import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";
import URL from "../config/url";

const useAvailability = () => {
  const {userId} = useStore((state) => state);
  const fetchAvailability = async () => {
    const res = await axios.get(`${URL}/client/availability?clientId=${userId}`);
    return res.data.dayStartEndTimeList;
  }
  return useQuery({
    queryKey: ["availability"],
    queryFn: fetchAvailability,
  });
}

export default useAvailability;