import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";
import {add} from "date-fns";
import {v4 as uuid} from "uuid";
import URL from "../config/url";

const useSession = (sessionQuery) => {
  const {role} = useStore((state) => state);
  const fetchSession = async () => {
    let data = []
    let currWeek = [];
    let prevWeek = [];
    let prevPrevWeek = [];
    let nextWeek = [];
    let nextNextWeek = [];
    await axios.get(`${URL}/schedule/${role}/offset/range`, {
      params: sessionQuery,
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      currWeek = res.data.length > 0 ? res.data : []
    });
    await axios.get(`${URL}/schedule/${role}/offset/range`, {
      params: {...sessionQuery, offset: sessionQuery.offset - 1},
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      prevWeek = res.data.length > 0 ? res.data : []
    })
    await axios.get(`${URL}/schedule/${role}/offset/range`, {
      params: {...sessionQuery, offset: sessionQuery.offset - 2},
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      prevPrevWeek = res.data.length > 0 ? res.data : []
    })
    await axios.get(`${URL}/schedule/${role}/offset/range`, {
      params: {...sessionQuery, offset: sessionQuery.offset + 1},
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      nextWeek = res.data.length > 0 ? res.data : []
    })
    await axios.get(`${URL}/schedule/${role}/offset/range`, {
      params: {...sessionQuery, offset: sessionQuery.offset + 2},
      headers: {"Content-Type": "application/json"},
    }).then(res => {
      nextNextWeek = res.data.length > 0 ? res.data : []
    })
    const concat = [].concat(...prevPrevWeek, ...prevWeek, ...currWeek, ...nextWeek, ...nextNextWeek);
    for (const item of concat) {
      const year = parseInt(item.session.startDate.split("-")[0]);
      const month = parseInt(item.session.startDate.split("-")[1]);
      const day = parseInt(item.session.startDate.split("-")[2]);
      const hour = parseInt(item.session.startTime.substring(0, 2));
      const minute = parseInt(item.session.startTime.substring(2, 4));
      const duration = parseInt(item.session.sessionTimeLength);
      const startDate = new Date(year, month - 1, day, hour, minute);
      const endDate = add(
        new Date(year, month - 1, day, hour, minute),
        {
          minutes: duration,
        }
      );
      data.push({
        // weekView needed
        id: uuid(),
        startDate: startDate,
        endDate: endDate,
        description:
          item.clientProfileList[0].clientId === 0 ? "Block" : "client" + item.clientProfileList[0].clientId,
        color: item.clientProfileList[0].clientId === 0 ? "#000000" : "#005A9C",
        resolveOverlap: "stack",
        // navigation needed
        sessionObj: {
          clientProfileList: item.clientProfileList,
          session: item.session,
          location: item.location

        }
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