import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "../../redux/Store/storeSlice";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_WISHLIST, ADD_TO_CART } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Wishlist = () => {
  const url = "https://afternoon-spire-43659.herokuapp.com/"
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.store.wishlist);

  const [removeFromWishList] = useMutation(REMOVE_FROM_WISHLIST);
  const [add2Cart] = useMutation(ADD_TO_CART);

  const removeFromWishlistHandler = async (id) => {
    await removeFromWishList({
      variables: {
        productId: id,
        token: Auth.getToken(),
      },
    }).then(() => {
      dispatch(removeFromWishlist(id));
    });
  };

  const addToCartHandler = async (item) => {
    const data = {
      ...item,
      quantity: 1,
    };

    await add2Cart({
      variables: {
        ...data,
        id: data._id,
        quantity: 1,
        imageUrl: data.image_url,
        token: Auth.getToken(),
      },
    });
    dispatch(addToCart(data));
  };

  return (
    <div className='flex flex-col px-5'>
      <div className='w-full'>
        {wishlist.length === 0 ? (
          <div className='flex flex-col items-center justify-center pt-5'>
            <h4 className='text-2xl text-gray-700 font-medium'>
              Your wishlist is empty
            </h4>
          </div>
        ) : (
          <>
            {wishlist.map((product, index) => {
              const border = index !== wishlist.length - 1 && "border-b";
              return (
                <div key={product._id} className='flex flex-col py-3'>
                  <div className='flex flex-wrap'>
                    <div className='w-4/12'>
                      <img
                        className='h-20 w-20'
                        src={`${url}${product.image_url}`}
                        alt={product.name}
                      />
                    </div>
                    <div className='w-8/12'>
                      <Link to={`/store/product/${product._id}`}>
                        <div className='font-bold text-xl mb-2 hover:text-blue-700 hover:underline'>
                          {product.name}
                        </div>
                      </Link>
                      <p className='text-gray-700 font-semibold'>
                        ${product.price}
                      </p>
                    </div>
                    <div className='w-full'>
                      <div className='flex flex-col'>
                        <div className='flex flex-row'></div>
                        <div>
                          <div
                            className={`w-full flex justify-center py-4 ${border}`}
                          >
                            <button
                              onClick={() => addToCartHandler(product)}
                              className='ml-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent'
                            >
                              Add To Cart
                            </button>
                            <button
                              onClick={() =>
                                removeFromWishlistHandler(product._id)
                              }
                              className='ml-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent'
                            >
                              Remove From Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
