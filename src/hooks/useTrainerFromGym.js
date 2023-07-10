import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import URL from "../constant/config";

const useTrainerFromGym = (gymObj) => {
  const fetchTrainerFromGym = async () => {
    let data = []
    const res = await axios.get(`${URL}/trainers/gym/${gymObj.locationId}`)
    data = res.data
    return data;
  }

  return useQuery({
    queryKey: ["trainerFromGym", gymObj],
    queryFn: fetchTrainerFromGym,
  })
}
export default useTrainerFromGym;