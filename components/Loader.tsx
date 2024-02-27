import { SkewLoader } from "react-spinners";

const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
    <SkewLoader
      color="#1DF3E6"
      size={50}
    />
    <p className='text-sm font-bold text-primary-grey-300'>Loading... </p>
    <p className='text-sm font-bold text-primary-grey-300'>If it keeps loading for some seconds reload the page </p>
  </div>
);

export default Loader;
