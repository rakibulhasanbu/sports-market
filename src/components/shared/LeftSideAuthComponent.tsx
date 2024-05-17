import { Link } from "react-router-dom";

const LeftSideAuthComponent = () => {
    return (
        <div className='hidden lg:block lg:w-[42%] p-3 2xl:p-5'>
            <div className='relative bg-black/85 h-full w-full rounded-2xl lg:rounded-3xl'>
                <img src="/assets/auth/Rectangle.png" alt="left side " className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl" />
                <img src="/assets/auth/dots-dots.png" alt="left side " className="absolute top-0 left-0 h-full w-full rounded-2xl lg:rounded-3xl" />
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between rounded-2xl lg:rounded-3xl p-12 2xl:p-14'>
                    <Link to={'/'} className='flex items-center'>
                        <img src="/favicon.png" alt="" className="size-10 2xl:size-11" />
                        <h2 className="text-white text-xl 2xl:text-2xl font-medium">Sports Market</h2>
                    </Link>
                    <div className=''>
                        <h1 className="font-bold text-4xl 2xl:text-5xl text-white mr-10">Fuel Your Passion, Explore Our Sports Market</h1>
                        <p className="pt-4 2xl:pt-8 text-[#F5F5F5] 2xl:text-lg">Discover Where Passion Meets Commerce: Your Ultimate Sports Market Destination - Score big deals and fuel your athletic passion, all in one convenient hub.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideAuthComponent;