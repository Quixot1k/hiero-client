import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useStore} from "../store";
import axios from "axios";

const useRemoveSession = () => {
  const queryClient = useQueryClient();
  const role = useStore((state) => state.role);
  const removeSession = async (sessionObj) => {
    console.log(sessionObj);
    if (role === "client") {
    } else if (role === "trainer") {
      await axios
        .delete("http://localhost:10001/schedule/deleteByTrainer", {
          data: sessionObj,
        }).then(res => res.data);
    }
  }
  return useMutation({
    mutationFn: removeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
      }).then(res => console.log(res));
    },
  })
}

export default useRemoveSession;