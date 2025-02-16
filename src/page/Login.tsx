import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters").max(20, "Password cannot exceed 20 characters"),
});

type Inputs = z.infer<typeof loginSchema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(data);
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
                                <input type="password" className={`input focus:outline-none ${errors.password ? "border-red-500 focus:border-red-500" : ""}`} placeholder="Password" {...register("password")} />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                <div className="mt-4"><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
