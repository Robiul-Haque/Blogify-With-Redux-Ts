import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { forgotPasswordEmail } from "../redux/features/auth/authSlice";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
})
type Inputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        // const toastId = toast.loading("Sending reset OTP");
        try {
            const res = await forgotPassword({ email: data.email }).unwrap();
            if (res?.success) {
                dispatch(forgotPasswordEmail({ email: data.email }));
                toast.success("Reset OTP sent to your email!");
                navigate("/verify-otp");
            } else {
                toast.error("Failed to send reset OTP");
            }
        } catch (error) {
            type ErrorResponse = { data?: { message?: string } };
            const message = (error as ErrorResponse)?.data?.message || "Something went wrong";
            toast.error(message);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col w-[25%]">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-[800]">Forgot Password</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="font-[400]">
                            <fieldset className="fieldset">
                                <p className="text-gray-600 mb-2 text-md text-center font-semibold">We'll email you a OTP code to reset it</p>
                                <label className={`fieldset-label ${errors.email ? "text-red-500" : ""} mb-1`}>Email</label>
                                <input
                                    type="email"
                                    className={`input focus:outline-none w-full ${errors.email ? "border-red-500" : ""}`}
                                    placeholder="Enter your email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
                                )}
                                {
                                    isLoading ?
                                        <button type="button" className="btn btn-neutral mt-4 opacity-80">
                                            <div className="w-6 h-6 border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                                            Sending OTP
                                        </button>
                                        :
                                        <button type="submit" className="btn btn-neutral mt-4 w-full">
                                            Send OTP
                                        </button>
                                }
                            </fieldset>
                        </form>
                        <p className="text-md text-center mt-5">
                            Remembered your password?{" "}
                            <Link to="/login" className="font-bold hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;