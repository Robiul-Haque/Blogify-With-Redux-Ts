import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useViewUserProfileInfoQuery } from "../../redux/features/user/userApi";

const userInfoUpdateSchema = z.object({
    name: z.string().min(1),
    email: z.string(),
    image: z
        .any()
        .optional()
        .refine((file) => !file || (file instanceof File && file.size <= 4 * 1024 * 1024), {
            message: "Image size max 4 MB or less then",
        }),
});

type Inputs = z.infer<typeof userInfoUpdateSchema>;

const ProfileForm = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm<Inputs>(
        {
            resolver: zodResolver(userInfoUpdateSchema),
        }
    );
    const { id } = useAppSelector((state: RootState) => state.auth);
    const { data, isLoading } = useViewUserProfileInfoQuery(id || "");
    const { data: profileData } = data || {};
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileInfoMutation(undefined);

    useEffect(() => {
        reset({
            name: profileData?.name || "",
            email: profileData?.email || "",
        });
    }, [profileData, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setValue("image", file);
        }
    };

    const onSubmit = (data: Inputs): void => {
        const formData = new FormData();

        const updateProfileData = {
            id: profileData?._id,
            name: data.name,
        }

        formData.append("data", JSON.stringify(updateProfileData));
        formData.append("image", data.image);

        // updateProfile(formData)
        //     .unwrap()
        //     .then(() => {
        //         toast.success("Profile updated successfully.");
        //         setPreviewImage(null);
        //     })
        //     .catch((err) => {
        //         toast.error("Failed to update profile, Please try again.");
        //         console.error("Error:", err);
        //     })
    }

    return (
        <>
            {
                isLoading ?
                    <div className="skeleton w-[80%] h-90 mx-auto mt-12"></div>
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col">
                        <img src={profileData?.image?.url} alt={profileData?.name} className="size-22 rounded-full my-2" />
                        <div className="w-[90%] px-4">
                            <label className={`${errors.name ? "text-red-500 font-semibold" : null} fieldset-label mb-2.5`}>Title {errors.name ? "*" : null}</label>
                            <input type="text" className={`${errors.name ? "focus:outline-red-500 border-red-500" : null} input`} {...register("name")} />
                        </div>
                        <div className="w-[90%] px-4 py-5">
                            <label className="fieldset-label mb-2.5">Image</label>
                            <div className="flex items-center gap-2">
                                <input type="file" className="file-input" accept=".jpg, .jpeg, .png, .webp" onChange={handleImageChange} />
                                {previewImage && <img className="size-10 rounded" src={previewImage} alt={profileData?.category} />}
                            </div>
                        </div>
                        <div className="w-[90%] px-4 pb-4 relative">
                            <label className="fieldset-label mb-2.5">Email</label>
                            <input type="email" className="input focus:outline-none focus:border-gray-300 bg-base-200" title="Can,t change this field value" readOnly {...register("email")} />
                            <p className="badge badge-soft badge-neutral badge-xs font-semibold absolute right-10 top-5 capitalize">{profileData?.role}</p>
                        </div>
                        {/* {
                            updateLoading ?
                                <button type="button" title="Updating..." className="btn btn-neutral opacity-90 w-[80%] mt-4"><span className="loading loading-bars loading-lg"></span></button>
                                :
                                <button type="submit" className="btn btn-neutral w-[80%] mt-4">Update</button>

                        } */}
                    </form>
            }
        </>
    )
}

export default ProfileForm;