import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useResetPasswordMutation } from "../redux/features/user/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type FormData = { password: string; confirmPassword: string; };


const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const password = watch("password");
    const { email } = useAppSelector((state: RootState) => state.user);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (!email) {
        return <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex justify-center items-center flex-col hero bg-base-200 px-8 py-18 rounded-lg shadow-xl w-84">
                <h2 className="text-center text-2xl font-bold">No Email Found</h2>
                <p className="text-center text-gray-500 my-4">Please go back and try again.</p>
                <button className="btn btn-neutral" onClick={() => navigate("/forgot-password")}>Go Back</button>
            </div>
        </div>;
    }

    const onSubmit = (data: FormData) => {
        // Handle password reset logic here
        if (data.password === data.confirmPassword && email) {
            resetPassword({ email, password: data.password })
                .unwrap()
                .then((res) => {
                    if (res?.success) {
                        toast.success(res?.message || "Password reset successful!");
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    toast.error(error?.data?.message || "Failed to reset password. Please try again.");
                });
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col w-[90%] max-w-md">
                <div className="card w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Password Field */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className={`input input-bordered w-full ${errors.password ? "border-red-500 focus:outline-red-500" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-50 text-gray-500 hover:text-gray-800 transition-colors"
                                    tabIndex={-1}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        // Improved Eye-off (hidden) icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M17.94 17.94A10.06 10.06 0 0112 20C6.48 20 2 15.52 2 12c0-1.61.38-3.13 1.06-4.44M6.34 6.34A9.97 9.97 0 0112 4c5.52 0 10 4.48 10 8 0 1.61-.38 3.13-1.06 4.44M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    ) : (
                                        // Improved Eye (show) icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <ellipse cx="12" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                            {/* Confirm Password Field */}
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className={`input input-bordered w-full ${errors.confirmPassword ? "border-red-500 focus:outline-red-500" : ""}`}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === password || "Passwords do not match",
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-50 text-gray-500 hover:text-gray-800 transition-colors"
                                    tabIndex={-1}
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        // Improved Eye-off (hidden) icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M17.94 17.94A10.06 10.06 0 0112 20C6.48 20 2 15.52 2 12c0-1.61.38-3.13 1.06-4.44M6.34 6.34A9.97 9.97 0 0112 4c5.52 0 10 4.48 10 8 0 1.61-.38 3.13-1.06 4.44M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    ) : (
                                        // Improved Eye (show) icon
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <ellipse cx="12" cy="12" rx="10" ry="8" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

                            {
                                isLoading ?
                                    <button type="button" className="btn btn-neutral w-full mt-2 opacity-80"><div className="w-6 h-6 border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div> Resetting...</button>
                                    :
                                    <button type="submit" className="btn btn-neutral w-full mt-2">Reset Password</button>
                            }
                            <p className="text-gray-500 text-sm mt-2 text-center">Please enter a new password with at least 8 characters and confirm it.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;