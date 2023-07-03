import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";

const useTodaySession = () => {
  const role = useStore((state) => state.role);
  const userId = useStore((state) => state.userId);
  const fetchTodaySession = async () => {
    let data = []
    if (role === "client") {
      await axios.get(`http://localhost:10001/schedule/client/today/${userId}`).then(res => {
        data = res.data
      })
    } else if (role === "trainer") {
      await axios.get(`http://localhost:10001/schedule/trainer/today/${userId}`).then(res => {
        data = res.data;
      })
    }
    return data;
  }
  return useQuery({
    queryKey: ["session", "todaySession"],
    queryFn: fetchTodaySession
  });
}

export default useTodaySession;