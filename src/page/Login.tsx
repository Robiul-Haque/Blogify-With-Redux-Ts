import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse w-[25%]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl inter font-[800]">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="roboto font-[400]">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input type="email" className="input" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                <label className="fieldset-label mt-4">Password</label>
                                <input type="password" className="input" placeholder="Password" {...register("password", { required: true, max: 20, min: 5 })} />
                                <div><a className="link link-hover">Forgot password?</a></div>
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
