import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, updateCurrentPage } from "../redux/Store/storeSlice";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../utils/queries";
import Loading from "../components/Loading";
import { categories, slideImages } from "../utils/data";

const Home = () => {
  let categories_ids = useSelector((state) => state.store.categories);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      dispatch(updateCategory(data.categories));
    }
  }, [data, dispatch]);

  categories_ids = categories_ids.map((category) => {
    return {
      name: category.name,
      path: `/store/category/${category._id}`,
    };
  });

  return (
    <div className='flex flex-col flex-1'>
      {loading && <Loading />}
      <div
        data-aos='fade-in'
        data-aos-delay='100'
        data-aos-duration='1000'
        className='container mx-auto my-3 md:my-5'
      >
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div className='each-slide' key={index}>
              <div>
                <img
                  className='slideImage'
                  src={slideImage.url}
                  alt='slide-pictures'
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration='1000'
        className='flex bg-white flex-col justify-center mb-4 shadow-md'
      >
        <h2 className='text-center text-4xl py-4 font-semibold'>
          Welcome to ProPet{" "}
        </h2>
        <div className='w-full text-center'>
          <Link
            to='/store'
            onClick={() => dispatch(updateCurrentPage("store"))}
          >
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4'>
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration='1000'
        className='bg-white mb-5 shadow-md'
      >
        <div className='container mx-auto'>
          <div className='p-2'>
            <p className='font-bold md:ml-9 text-2xl'>Shop By Pet</p>
          </div>
          <div className='categories bg-white pb-5'>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-4'>
              {categories.map((category, index) => {
                const item = categories_ids.filter(
                  (categoryData) => categoryData.name === category.name
                )[0];
                return (
                  <Link
                    onClick={() => dispatch(updateCurrentPage("store"))}
                    to={`${item?.path}`}
                    key={index}
                  >
                    <div key={index} className='text-center mx-auto'>
                      <img
                        className='inline-flex w-44'
                        alt={item?.name}
                        src={category.url}
                      />
                      <p className='mt-5 font-semibold text-lg'>{item?.name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
