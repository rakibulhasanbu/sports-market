import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUpSuccess = () => {
    return (
        <div className='flex lg:h-[100vh]'>
            {/* this is left side div  */}
            <LeftSideAuthComponent />

            {/* this is form and other staff  */}
            <div className='w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center '>
                <div className='max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36'>
                    <Image width={200} height={160} src="/assets/auth/congratulations.png" alt="" className="mx-auto" />
                    <h2 className="text-2xl lg:text-3xl font-bold text-textBlack text-center pb-1 lg:pb-2 px-4 pt-4 lg:pt-6 2xl:pt-8">Congratulations, account created successfully</h2>

                    <Link href={'/'}>
                        <button
                            className="appBtn w-full mt-4"
                        >
                            Go to Marketplace
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpSuccess;