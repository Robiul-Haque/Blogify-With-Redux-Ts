import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useCreateBlogMutation } from "../../redux/features/admin/blog";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";

const createBlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1),
    content: z.string().min(1),
    image: z
        .instanceof(File, { message: "" })
        .refine((file) => !file || (file instanceof File && file.size <= 4 * 1024 * 1024), {
            message: "Image size max 4 MB or less then",
        }),
});

type Inputs = z.infer<typeof createBlogSchema>;

const CreateBlogModal = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Inputs>(
        {
            resolver: zodResolver(createBlogSchema),
        }
    );
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const adminId = useAppSelector(state => state.auth.id);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setValue("image", file);
        }
    };

    const onSubmit = (data: any): void => {
        const formData = new FormData();

        const createNewBlogData = {
            author: adminId,
            title: data.title,
            category: data.category,
            content: data.content,
        }

        formData.append("data", JSON.stringify(createNewBlogData));
        formData.append("image", data.image);

        createBlog(formData)
            .unwrap()
            .then(() => {
                reset();
                setPreviewImage(null);
            })
            .catch((err) => {
                toast.error("Failed to create blog, Please try again.");
                console.error("Error:", err);
            })
    }

    return (
        <dialog id="create_blog_modal" className="modal">
            <div className="modal-box overflow-auto">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body py-4 mx-auto w-full">
                    <fieldset className="fieldset mx-auto w-full">
                        <h1 className="text-xl font-bold">Create Blog</h1>
                        <label className={`${errors.title ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Title {errors.title ? "*" : null}</label>
                        <input type="text" className={`${errors.title ? "focus:outline-red-500 border-red-500" : null} input w-full`} {...register("title")} />
                        <label className={`${errors.category ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Category {errors.category ? "*" : null}</label>
                        <input type="text" className={`${errors.category ? "focus:outline-red-500 border-red-500" : null} input w-full`} {...register("category")} />
                        <div className="mt-3">
                            <label className={`${errors.image ? "text-red-500 font-semibold" : ""} fieldset-label text-sm mb-0.5`}>Image {errors.image ? "*" : null}</label>
                            <span className="flex justify-between items-center gap-2">
                                <input type="file" accept=".jpg, .jpeg, .png, .webp" onChange={handleImageChange} className={`${errors.image ? "focus:outline-red-500 border-red-500" : null} file-input`} />
                                {previewImage && <img className="size-12 rounded" src={previewImage} />}
                                {errors.image && <p className={errors.image ? "text-red-500 text-sm" : ""}>{errors.image.message?.toString()}</p>}
                            </span>
                        </div>
                        <label className={`${errors.content ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Content {errors.content ? "*" : null}</label>
                        <textarea className={`${errors.content ? "focus:outline-red-500 border-red-500" : null} textarea w-full`} {...register("content")} rows={6} />
                        {
                            isLoading ?
                                <button type="button" title="Creating..." className="btn btn-neutral opacity-90 mt-4"><span className="loading loading-bars loading-lg"></span></button>
                                :
                                <button type="submit" className="btn btn-neutral mt-4">Create</button>

                        }
                    </fieldset>
                </form>
            </div>
        </dialog >
    )
}

export default CreateBlogModal;
