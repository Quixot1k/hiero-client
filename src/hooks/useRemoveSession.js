import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useStore} from "../store";
import axios from "axios";
import {useNavigation, useRoute} from "@react-navigation/native";

const useRemoveSession = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const route = useRoute();
  const role = useStore((state) => state.role);
  const removeSession = async (sessionObj) => {
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
      }).then(() => {
        console.log(route.name);
        if (route.name === "SessionDetailScreen") {
          navigation.goBack();
        }
      });
    },
  })
}

export default useRemoveSession;