import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import AppFormInput from "@/components/ui/AppFormInput";
import { useForgotPasswordMutation } from "@/redux/features/user/userApi";
import { ResponseErrorType } from "@/types/common";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";

interface FormData {
    email: string;
}

const ForgotPassword = () => {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {

        forgotPassword(data.email).unwrap().then((res: ResponseErrorType) => {
            if (!res?.data.success) {
                toast.error(res?.data.message || "something went wrong");
            } else {
                toast.success("Successfully Send Token");
            }
        })
            .catch(() => {
                toast.error("something went wrong");
            });
    }

    return (
        <div className='flex lg:h-[100vh]'>
            {/* this is left side div  */}
            <LeftSideAuthComponent />
            {/* this is form and other staff  */}
            <div className='w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center '>
                <div className='w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36'>
                    <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">Forgot Password</h2>
                    <p className="text-[#645D5D] text-xs lg:text-sm">Please enter your email address so we’ll send you link to get back into your account.
                    </p>

                    <form
                        className="w-full md:w-[500px] 2xl:w-[560px] py-6 2xl:py-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <AppFormInput
                            name="email"
                            required={true}
                            register={register}
                            type="email"
                            label="Email address"
                            placeholder="Type your Email address"
                            error={errors.email}
                        />
                        {isLoading ?
                            <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 "><AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" /></button>
                            :
                            <button
                                type="submit"
                                className="appBtn mt-4 lg:mt-6 w-full"
                            >
                                Send Code
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;