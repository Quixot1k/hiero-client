import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";
import URL from "../config/url";

const useAddSession = () => {
  const queryClient = useQueryClient();
  const {role, userId} = useStore((state) => state);
  const addSession = async (sessionObj) => {
    await axios.post(`${URL}/schedule/adhoc`, sessionObj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return useMutation({
    mutationFn: addSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
      }).then(res => console.log(res));
    },
  });
}

export default useAddSession