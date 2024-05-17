import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import AppFormInput from "@/components/ui/AppFormInput";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    accept?: any;
}

const CreateNewPassword = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    }
    return (
        <div className='flex lg:h-[100vh]'>
            {/* this is left side div  */}
            <LeftSideAuthComponent />
            {/* this is form and other staff  */}
            <div className='w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center '>
                <div className='w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36'>
                    <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">Create new password</h2>
                    <p className="text-[#645D5D] text-xs lg:text-sm">Create your new password to get back into your account</p>

                    <form
                        className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div>
                            <AppFormInput
                                name="password"
                                required={true}
                                register={register}
                                type="text"
                                label="Password"
                                placeholder="Type your Password"
                                error={errors.password}
                            />
                            <div className='text-textBlack ml-5 text-xs mt-2 space-y-1'>
                                <p className="list-item">Minimum length of 3-30 characters</p>
                                <p className="list-item">Only lowercase, numeric and symbols allowed</p>
                            </div>
                        </div>

                        <AppFormInput
                            name="confirmPassword"
                            required={true}
                            register={register}
                            type="text"
                            label="Confirm password"
                            placeholder="Type your Confirm password"
                            error={errors.confirmPassword}
                        />
                        <div className=''>
                            <button
                                type="submit"
                                className="appBtn mt-4 w-full"
                            >
                                Reset Password
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPassword;