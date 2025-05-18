import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last digit
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

    const toastId = toast.loading("Verifying OTP...");
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("OTP Verified!", { id: toastId });
      navigate("/");
    } catch (error) {
      toast.error("Invalid OTP!", { id: toastId });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-[90%] max-w-md">
        <div className="card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Verify OTP</h2>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    className="input input-bordered w-12 text-center text-xl"
                  />
                ))}
              </div>
              <button type="submit" className="btn btn-neutral w-full">
                Verify OTP
              </button>
            </form>
            <p className="text-center text-sm mt-4 text-gray-500">
              Didn’t receive the code?{" "}
              <button className="link link-hover font-bold">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;