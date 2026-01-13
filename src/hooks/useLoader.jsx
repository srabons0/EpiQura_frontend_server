import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLoader = (name, url, enabled = true ) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: dataItem = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: [name, url],
    // enabled: !!user?.email && !loader,
  enabled: enabled, 
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return [dataItem, isPending, refetch];
};


export default useLoader;
