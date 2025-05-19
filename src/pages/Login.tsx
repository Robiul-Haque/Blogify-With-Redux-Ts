import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import decodedToken from "../utils/decodedToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters").max(20, "Password cannot exceed 20 characters"),
});

type Inputs = z.infer<typeof loginSchema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>(
        {
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "robiulcoc430@gmail.com",
                password: "Admin430@"
            }
        }
    );
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const tostId = toast.loading("Logging in...");

        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            }
            const res = await login(userInfo).unwrap();

            // Decoded the new token, set the new access token & user info in the auth state, set the refresh token cookies, then navigate the admin dashboard.
            const { id, name, email, role, image } = decodedToken(res?.data?.accessToken);
            const token = res?.data?.accessToken;
            dispatch(setUser({ id, name, email, image, role, token }));

            Cookies.set("refreshToken", res?.data?.refreshToken, { expires: parseInt(res?.data?.refreshTokenExpireIn) });

            if (res?.success && role === "user") {
                navigate(from);
                toast.success("Logged in...", { id: tostId });
            } else if (res?.success && role === "admin") {
                navigate("/admin/dashboard");
                toast.success("Logged in...", { id: tostId });
            }
        } catch (error) {
            type ErrorResponse = { data?: { message?: string } };
            const errorMessage = (error as ErrorResponse)?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { id: tostId });
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse w-[25%]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl inter font-[800]">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="roboto font-[400]">
                            <fieldset className="fieldset">
                                <label className={`fieldset-label ${errors.email ? "text-red-500" : ""}`}>Email</label>
                                <input type="email" className={`input focus:outline-none ${errors.email ? "border-red-500 focus:border-red-500" : ""}`} placeholder="Email" {...register("email")} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                <label className={`fieldset-label mt-4 ${errors.password ? "text-red-500" : ""}`}>Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} className={`input focus:outline-none ${errors.password ? "border-red-500 focus:border-red-500" : ""}`} placeholder="Password" {...register("password")} />
                                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <img className="size-5 cursor-pointer" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible" /> : <img className="size-5 cursor-pointer" src="https://img.icons8.com/material-rounded/50/invisible.png" alt="invisible" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                <div className="mt-4"><Link to="/forgot-password" className="link link-hover">Forgot password?</Link></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <p className="text-md text-center mt-6">Don’t have an account?{" "} <Link to="/sign-up" className="font-bold relative inline-block mb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full">Sign up</Link> </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;