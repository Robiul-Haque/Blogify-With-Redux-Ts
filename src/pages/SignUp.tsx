import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../redux/features/user/userApi";

// Signup schema validation
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  image: z
    .custom<FileList>((file) => file instanceof FileList && file.length === 1, "Image is required"),
});

type Inputs = {
  name: string;
  email: string;
  password: string;
  image: FileList;
};

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signUp, { isLoading }] = useSignupMutation();

  // Watch the image field

  // Preview the image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const toastId = toast.loading("Signing up...");

    const formData = new FormData();

    const newUserData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    formData.append("data", JSON.stringify(newUserData));
    formData.append("image", data.image[0]);

    signUp(formData)
      .unwrap()
      .then((res: unknown) => {
        console.log(res);
        toast.success("Signup successful!", { id: toastId });
        reset();
        setImagePreview(null);
      })
      .catch((error: unknown) => {
        console.error(error);
        toast.error("Something went wrong!", { id: toastId });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="card bg-base-100 w-full shadow-2xl">
          <div className="card-body">
            <h2 className="text-center text-2xl inter font-[800]">Continue your blogging journey</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <label className={`label ${errors.name ? "text-red-500" : ""}`}>Name</label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.name ? "border-red-500" : ""}`}
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              {/* Email */}
              <label className={`label mt-4 ${errors.email ? "text-red-500" : ""}`}>Email</label>
              <input
                type="email"
                className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              {/* Password */}
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

              {/* Image */}
              <label className={`label mt-4 ${errors.image ? "text-red-500" : ""}`}>Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && <p className="text-red-500">{String(errors.image.message)}</p>}

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-5">
                  <img src={imagePreview} alt="Preview" className="rounded-md max-h-20 object-cover mx-auto" />
                </div>
              )}

              {/* Submit button */}
              <button className="btn btn-neutral mt-6 w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-md text-center mt-6">
              Have an account{" "}
              <Link
                to="/login"
                className="font-bold relative inline-block mb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;