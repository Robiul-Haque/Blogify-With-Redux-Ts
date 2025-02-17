import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import decodedToken from "../utils/decodedToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

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

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            }
            const res = await login(userInfo).unwrap();
            const { name, email, role } = decodedToken(res?.data?.accessToken);
            const token = res?.data?.accessToken;
            // Set the new access token & user info in the user state.
            dispatch(setUser({ name, email, role, token }));
            if (res?.success) navigate("/admin/dashboard");
        } catch (err) {
            console.log(err);
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
                                <div className="mt-4"><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;
