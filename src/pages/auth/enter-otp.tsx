import LeftSideAuthComponent from "@/components/auth/LeftSideAuthComponent";
import Loading from "@/components/ui/Loading";
import {
  resendEmail,
  verifyUserWithToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

interface FormData {
  input1: string;
}

const EnterOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user?.id && !isLoading) {
      router.push("/auth/sign-in");
    }
    if (user?.id && user.isVerified) {
      router.push("sign-up-success");
    }
  }, [user, router, isLoading]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isDisabled) {
      // Start countdown when button is disabled
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            // If countdown reaches 1, enable the button
            setIsDisabled(false);
            clearInterval(countdownInterval);
            return 30; // Reset countdown to 30 seconds
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }

    // Clear interval when component is unmounted or when button is re-enabled
    return () => clearInterval(countdownInterval);
  }, [isDisabled]);

  const handleResendClick = () => {
    // Add your logic for sending the verification email here
    // For example, you might make an API request to resend the email.
    if (user?.email) {
      dispatch(resendEmail(user.email))
        .unwrap()
        .then((res) => {
          toast.success("Successfully verification email sent");
        })
        .catch((err) => {
          toast.error("something went wrong to send email");
        });
    }
    // After clicking the button, disable it and start the countdown
    setIsDisabled(true);
  };

  use;
  if (isLoading) {
    return <Loading />;
  }
  if (!user?.id) {
    return <Loading />;
  }

  const onSubmit = () => {
    if (otp.length !== 6) {
      toast.error("Enter otp properly");
      return;
    }
    dispatch(verifyUserWithToken(otp))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex lg:h-[100vh]">
      {/* this is left side div  */}
      <LeftSideAuthComponent />

      {/* this is form and other staff  */}
      <div className="w-full lg:w-[58%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Enter OTP
          </h2>
          <p className="text-[#645D5D] text-xs lg:text-sm">
            A 6-digit OTP (one time password) has been sent to your e-mail for
            verification.
          </p>

          <div className="w-full md:w-[500px] 2xl:w-[560px] py-2 lg:py-4 2xl:py-5 ">
            <div className="py-4 2xl:py-5">
              <OTPInput
                numInputs={6}
                value={otp}
                // {...register("input1", { required: true })}
                onChange={(e) => setOtp(e)}
                // renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    type="number"
                    className="size-11 lg:size-14 mr-10 bg-[#F2F4F7] rounded text-center focus:border-2 !w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                  />
                )}
              />

              <div className="flex items-center justify-between pt-2 text-textGreyBlack text-sm">
                <p>
                  Already have an account?{" "}
                  <span className="text-primary font-medium pl-1">
                    <button
                      // href="/"
                      onClick={handleResendClick}
                      type="button"
                      disabled={isDisabled}
                      className={isDisabled ? "text-gray-400" : ""}
                    >
                      Resend
                    </button>
                  </span>
                </p>
                {isDisabled ? <p>{countdown}</p> : null}
              </div>
            </div>

            <button
              onClick={onSubmit}
              type="submit"
              className="appBtn mt-4 w-full"
            >
              Verify code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
