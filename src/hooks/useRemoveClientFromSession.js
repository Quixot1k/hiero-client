import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const useRemoveClientFromSession = () => {
  const queryClient = useQueryClient();
  const removeClientFromSession = async (sessionObj) => {
    await axios.delete(`http://localhost:10001/schedule/deleteByClient`, {
      data: sessionObj
    }).then(res => res.data);
  }
  return useMutation({
      mutationFn: removeClientFromSession,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["session"],
        })
      }
    }
  )
}

export default useRemoveClientFromSession;