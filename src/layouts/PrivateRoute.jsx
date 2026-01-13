import useAuth from '../hooks/useAuth';
import { Mosaic } from 'react-loading-indicators';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
const {user, loading} = useAuth();
    const location = useLocation();


if(loading){
    return <div className="flex mx-auto pt-32 pb-40 w-8 h-8">
          <Mosaic
            color={[
              "#000000",
              "#475569",
              "#4b5563",
              "#52525b",
              "#404040",
              "#262626",
              "#1c1917",
            ]}
            size="small"
            text=""
            textColor=""
          />
        </div>
}
if(user){
   return children;
}
    return  <Navigate state={location.pathname} to="/login">

        </Navigate >
    
    
};

export default PrivateRoute;
