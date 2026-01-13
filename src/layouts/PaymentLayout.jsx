import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import PaymentForm from "../PaymentMethod/PaymentForm";
import PaymentWayBtn from "../PaymentMethod/PaymentWayBtn";
import useAuth from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";

const PaymentLayout = () => {
// const {user, loading} = useAuth();



//     const [users, isPending, refetch] = useLoader(
//     "user",
//     `/user?email=${user.email}`,
//     !!user?.email && !loading
//   );
//   console.log(users);
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div><Link to="/addToCart">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        // onClick={handleBack}
        className="w-20 relative  left-14 top-10 z-30"
      >
        <FaCircleArrowLeft className="w-10 h-10" />
      </motion.button></Link>
      <PaymentForm></PaymentForm>
      <PaymentWayBtn></PaymentWayBtn>

      <Outlet></Outlet>
    </div>
  );
};

export default PaymentLayout;
