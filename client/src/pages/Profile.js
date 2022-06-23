import { Navigate } from "react-router-dom";
import { useSelector} from "react-redux";
import OrderHistory from "../components/OrderHistory";
import Wishlist from "../components/Wishlist";
import Auth from "../utils/auth";

const Profile = () => {
  const user = useSelector((state) => state.store.user);

  const isLoggined = Auth.loggedIn();
  if (!isLoggined) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='flex-1'>
        <div className='container mx-auto my-3 md:my-5'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full md:w-5/12 lg:w-4/12 px-2'>
              <div className='mx-auto w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                
                <div className='flex flex-col items-center pb-10 pt-12'>
                  <div className='relative z-0'>
                    <img
                      className='mb-3 w-24 h-24 rounded-full shadow-lg'
                      src={`${
                        user.image_url ? user.image_url : "https://afternoon-spire-43659.herokuapp.com/assets/images/user.png"
                      }`}
                      alt='user'
                    />
    
                  </div>
                  <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {user.first_name} {user.last_name}
                  </h5>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {user.email}
                  </span>
                  <div className='flex mt-4 space-x-3 lg:mt-6'></div>
                </div>
              </div>
              <div className='mx-auto w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-2'>
                <div className='flex flex-col items-center pb-10'>
                  <div className='w-full text-center'>
                    <h5 className='py-4 border-b mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                      Wishlist
                    </h5>
                    <Wishlist />
                  </div>
                  <div className='flex mt-4 space-x-3 lg:mt-6'></div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-7/12 lg:w-8/12 px-2 mt-2 md:mt-0'>
              <div className='mx-auto w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-6'>
                <div className='w-full'>
                  <OrderHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
