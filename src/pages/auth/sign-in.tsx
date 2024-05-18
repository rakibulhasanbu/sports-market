import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LeftSideAuthComponent from "../../components/shared/LeftSideAuthComponent";
import AppFormInput from "../../components/ui/AppFormInput";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { ResponseSuccessType, TGenericErrorResponse } from "../../types/common";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login(data).unwrap()
      .then((res: ResponseSuccessType) => {

        if (!res?.success) {
          toast.error(res?.message || "something wrong");
        } else {
          const user = verifyToken(res?.data?.accessToken)
          toast.success(res?.message || "Successfully Registered");
          dispatch(setUser({ user, accessToken: res?.data?.accessToken }))
          navigate(`/`);
        }
      })
      .catch((res: TGenericErrorResponse) => {
        toast.error(res?.data?.errorMessage || "something went wrong");
      });
  };

  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <LeftSideAuthComponent />
      {/* this is form and other staff  */}
      <div className="w-full lg:w-[50%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Login to your account{" "}
          </h2>
          <p className="text-[#645D5D] text-xs lg:text-sm">
            Don’t have an account?{" "}
            <span className="text-primary font-medium">
              <Link to="/auth/sign-up">Sign up</Link>
            </span>
          </p>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
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

            <AppFormInput
              name="password"
              required={true}
              register={register}
              type="password"
              label="Password"
              placeholder="Type your Password"
              error={errors.password}
            />

            <div className="flex items-center justify-end text-xs text-textGrey hover:text-primary lg:text-sm">
              {/* <Link to={"/auth/forgot-password"}> */}
              <p>Forgot Password?</p>{" "}
              {/* </Link> */}
            </div>

            {isLoading ? (
              <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
              </button>
            ) : (
              <button type="submit" className="appBtn mt-4 lg:mt-6 w-full">
                Log in
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
