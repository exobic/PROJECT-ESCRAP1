import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='border-t border-gray-200 flex flex-col   justify-between px-10'>
        <div className='pb-8 pt-16 flex justify-center'>
          <img
            src="/favicon.ico"
            alt="Poomas Buy and sell anything online in UAE"
            className=" w-40 h-36"
          />
        </div>
        <div className='relative flex items-center px-6 py-6 sm:py-8'>
          <div className='absolute inset-0 overflow-hidden rounded-lg'>
            <div
              aria-hidden='true'
              className='absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90'
            />
          </div>
          <div className='text-center relative mx-auto max-w-sm'>
            <h3 className='font-semibold text-gray-900'>Become a seller</h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Buy and sell with ease – find your perfect property, shop, or vehicle in the UAE with us.{' '}
              <Link
                to='/signin'
                className='whitespace-nowrap font-medium text-black hover:text-zinc-900'
              >
                Get started &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className='py-10 px-10 flex flex-col md:flex-row md:items-center md:justify-between text-center gap-5 '>
        <p className='text-sm text-muted-foreground mb-4 md:mb-0'>
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
        <div className='flex space-x-8'>
          <Link to='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Terms
          </Link>
          <Link to='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Privacy Policy
          </Link>
          <Link to='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
