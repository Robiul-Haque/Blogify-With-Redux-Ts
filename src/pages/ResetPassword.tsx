import { useForm } from "react-hook-form";

type FormData = {
    password: string;
    confirmPassword: string;
};

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        // Handle password reset logic here
        console.log(data);
    };

    const password = watch("password");

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col w-[90%] max-w-md">
                <div className="card w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="password"
                                placeholder="New Password"
                                className={`input input-bordered w-full ${errors.password ? "border-red-500 focus:outline-red-500" : ""}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={`input input-bordered w-full ${errors.confirmPassword ? "border-red-500 focus:outline-red-500" : ""}`}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                            )}
                            <button
                                type="submit"
                                className="btn btn-neutral w-full mt-2"
                            >
                                Reset Password
                            </button>
                            <p className="text-gray-500 text-sm mt-2 text-center">
                                Please enter a new password with at least 8 characters and confirm it.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;