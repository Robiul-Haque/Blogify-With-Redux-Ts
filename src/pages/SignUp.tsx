import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Signup schema validation
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  image: z.any().refine((file) => file?.length === 1, "Image is required"),
});

type Inputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Robiul",
      email: "robiulcoc420@gmail.com",
      password: "12345",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Signing up...");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Signup successful!", { id: toastId });
        navigate("/login");
      } else {
        toast.error(result.message || "Signup failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="card bg-base-100 w-full shadow-2xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className={`label ${errors.name ? "text-red-500" : ""}`}>Name</label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.name ? "border-red-500" : ""}`}
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              <label className={`label mt-4 ${errors.email ? "text-red-500" : ""}`}>Email</label>
              <input
                type="email"
                className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <label className={`label mt-4 ${errors.password ? "text-red-500" : ""}`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    className="w-5 h-5"
                    src={
                      showPassword
                        ? "https://img.icons8.com/material-outlined/24/visible--v1.png"
                        : "https://img.icons8.com/material-rounded/50/invisible.png"
                    }
                    alt="toggle visibility"
                  />
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

              <label className={`label mt-4 ${errors.image ? "text-red-500" : ""}`}>Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input file-input-bordered w-full"
              />
              {errors.image?.message && <p className="text-red-500">{String(errors.image.message)}</p>}

              <button className="btn btn-neutral mt-6 w-full">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;