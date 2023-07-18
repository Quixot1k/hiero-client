import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  const updateAvailability = async (availabilityObj) => {
    await axios.post(`${URL}/client/availability`, {availabilityObj}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return (
    useMutation({
      mutationFn: updateAvailability,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["availability"],
        })
      },
    })
  )
}

export default useUpdateAvailability;