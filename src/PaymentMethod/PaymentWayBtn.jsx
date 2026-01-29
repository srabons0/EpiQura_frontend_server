
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PaymentWayBtn = () => {

    return (
          <div className="flex md:gap-5 justify-center my-20">
        <Link to="/payment/offline"><motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.93 }}>
          <button className="m-2 px-2 py-1.5 md:px-9 md:py-4 block text-center font-medium uppercase text-white text-sm lg:text-base no-underline rounded-[10px] shadow-[0_0_20px_#eee] transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center]">
            Payment with offline
          </button>
        </motion.div></Link>
       <Link to="/payment/online"> <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
          <button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.93 }}
            className="m-2 px-2 text-sm lg:text-base py-1.5 md:px-9 md:py-4 block text-center font-medium uppercase text-white no-underline rounded-[10px] shadow-[0_0_20px_#eee] transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center]"
          >
            Payment with online
          </button>
        </motion.div></Link>
      </div>
    );
};

export default PaymentWayBtn;