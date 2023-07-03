import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const useBlockSession = () => {
  const queryClient = useQueryClient();
  const blockSession = async (sessionObj) => {
    console.log(sessionObj);
    await axios.post("http://127.0.0.1:10001/schedule/trainer/block", sessionObj, {
      headers: {"Content-Type": "application/json"},
    }).then(res => res.data);
  }

  return useMutation({
      mutationFn: blockSession,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["session"],
        }).then(res => console.log(res));
      },
    }
  );
}

export default useBlockSession;