import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
})

type Inputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const toastId = toast.loading("Sending reset OTP");
        try {
            // const res = await forgotPassword({ email: data.email }).unwrap();
            // if (res?.success) {
            //     toast.success("Reset OTP sent to your email!", { id: toastId });
            // } else {
            //     toast.error("Failed to send reset OTP", { id: toastId });
            // }
        } catch (error) {
            type ErrorResponse = { data?: { message?: string } };
            const message = (error as ErrorResponse)?.data?.message || "Something went wrong";
            toast.error(message, { id: toastId });
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
                                    className={`input focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                                    placeholder="Enter your email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
                                )}
                                <button type="submit" className="btn btn-neutral mt-4 w-full">
                                    Send OTP
                                </button>
                            </fieldset>
                        </form>
                        <p className="text-md text-center mt-6">
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