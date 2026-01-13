import { motion } from "framer-motion"
import useAuth from "../../hooks/useAuth";


const Profile = () => {
    const { user, logoutUser } = useAuth();
    return (
        <div className="pt-36 flex flex-col justify-center items-center">
            
            {user.email}
            <motion.button
                // initial={{ opacity: 0, scale: 1.5 }}
                // animate={{ opacity: 2, scale: 1 }}
                // transition={{ duration: 1.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} onClick={()=>{ logoutUser()}}
                className="bg-linear-to-r from-[#ffa620] to-[#fecb4a] text-white px-8 py-3 font-bold text-lg mt-10 rounded-xl ms-5 flex gap-1 items-center"> Sign Out</motion.button>
        </div>
    );
};

export default Profile;