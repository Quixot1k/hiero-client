import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";
import {add} from "date-fns";
import {v4 as uuid} from "uuid";

const useSession = () => {
  const role = useStore((state) => state.role);
  const userId = useStore((state) => state.userId);
  const fetchSession = async () => {
    let data = []
    const res = await axios.get(`http://127.0.0.1:10001/schedule/${role}?id=${userId}&week=0`);
    for (const item of res.data) {
      const year = parseInt(item.startDate.split("-")[0]);
      const month = parseInt(item.startDate.split("-")[1]);
      const day = parseInt(item.startDate.split("-")[2]);
      const hour = parseInt(item.startTime.substr(0, 2));
      const minute = parseInt(item.startTime.substr(2, 4));
      const duration = parseInt(item.sessionTimeLength);
      const startDate = new Date(year, month - 1, day, hour, minute);
      const endDate = add(
        new Date(year, month - 1, day, hour, minute),
        {
          minutes: duration,
        }
      );
      data.push({
        id: uuid(),
        startDate: startDate,
        endDate: endDate,
        clientId: item.clientId,
        description:
          item.clientId === 0 ? "Block" : "client" + item.clientId,
        color: item.clientId === 0 ? "#000000" : "#005A9C",
        resolveOverlap: "stack",
      });
    }
    return data;
  }
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession
  });
}

export default useSession;