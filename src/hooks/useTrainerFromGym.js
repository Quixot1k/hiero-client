import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useTrainerFromGym = (gymObj) => {
  const fetchTrainerFromGym = async () => {
    let data = []
    const res = await axios.get(`http://127.0.0.1:10001/trainers/gym/${gymObj.locationId}`)
    data = res.data
    return data;
  }
  
  return useQuery({
    queryKey: ["trainerFromGym", gymObj],
    queryFn: fetchTrainerFromGym,
  })
}
export default useTrainerFromGym;