import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const { email } = useSelector((state: RootState) => state.auth);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    try {
      verifyOtp({ email, otp: finalOtp })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success("OTP Verified!");
            navigate("/reset-password");
          }
        })
    } catch (error) {
      toast.error("Invalid OTP!");
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-[90%] max-w-md">
        <div className="card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Verify OTP</h2>
            <p className="text-center text-sm mt-4 text-gray-500">
              Please enter the 6-digit OTP sent to your email:{" "}
              <span className="font-semibold text-primary">{email || ""}</span>
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
              <div className="flex justify-between gap-1">
                {otp.map((digit, index) => (
                  <input key={index} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} ref={(el) => { inputsRef.current[index] = el; }} className="input input-bordered w-12 text-center text-xl" />
                ))}
              </div>
              {
                isLoading ?
                  <button type="button" className="btn btn-neutral mt-4 opacity-80">
                    <div className="w-6 h-6 border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                    Verifying OTP...
                  </button>
                  :
                  <button type="submit" className="btn btn-neutral w-full">
                    Verify OTP
                  </button>
              }
            </form>
            <p className="text-center text-sm mt-4 text-gray-500">
              Didn’t get the code?{" "}
              <span className="text-gray-500">Check your spam folder or</span>{" "}
              <button className="link link-hover text-black font-bold">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;