import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useStore} from "../store";

const useAddSession = () => {
  const queryClient = useQueryClient();
  const {role, userId} = useStore((state) => state);
  const addSession = async (addSessionQuery) => {
    await axios.post("http://127.0.0.1:10001/schedule/adhoc", addSessionQuery, {
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