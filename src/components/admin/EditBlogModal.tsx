import { useForm } from "react-hook-form";
import { useUpdateBlogMutation, useViewBlogForUpdateQuery } from "../../redux/features/admin/blog";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const blogUpdateSchema = z.object({
    title: z.string().min(1),
    category: z.string().min(1),
    content: z.string().min(1),
    image: z
        .any()
        .optional()
        .refine((file) => !file || (file instanceof File && file.size <= 4 * 1024 * 1024), {
            message: "Image size max 4 MB or less then",
        }),
});

type Inputs = z.infer<typeof blogUpdateSchema>;

const EditBlogModal = ({ id }: { id: string }) => {
    const { data, isLoading } = useViewBlogForUpdateQuery(id);
    const { data: blogData } = data || {};
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm<Inputs>(
        {
            resolver: zodResolver(blogUpdateSchema),
        }
    );
    const [previewImage, setPreviewImage] = useState<string | null>(blogData?.image?.url || null);
    const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation(undefined);

    useEffect(() => {
        reset({
            title: blogData?.title || "",
            category: blogData?.category || "",
            content: blogData?.content || ""
        });

        if (blogData?.image?.url) setPreviewImage(blogData.image.url);
    }, [blogData, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setValue("image", file);
        }
    };

    const onSubmit = (data: Inputs): void => {
        const formData = new FormData();

        const updateData = {
            id: blogData?._id,
            data: {
                title: data.title,
                category: data.category,
                content: data.content,
            }
        }

        formData.append("data", JSON.stringify(updateData));
        formData.append("image", data.image);

        updateBlog(formData);
    }

    return (
        <dialog id="edit_blog_modal" className="modal">
            {
                isLoading ?
                    <div className="skeleton w-[30%] h-[75%] mx-auto mt-12"></div>
                    :
                    <div className="modal-box overflow-auto">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body py-4 mx-auto w-full">
                            <h1 className="text-xl font-bold absolute left-54 top-4">Edit Blog</h1>
                            <fieldset className="fieldset mx-auto w-full">
                                <label className={`${errors.title ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Title {errors.title ? "*" : null}</label>
                                <input type="text" className={`${errors.title ? "focus:outline-red-500 border-red-500" : null} input w-full`} {...register("title")} />
                                <label className={`${errors.category ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Category {errors.category ? "*" : null}</label>
                                <input type="text" className={`${errors.category ? "focus:outline-red-500 border-red-500" : null} input w-full`} {...register("category")} />
                                <div className="mt-3">
                                    <label className={`${errors.image ? "text-red-500" : ""} fieldset-label text-sm mb-0.5`}>Image</label>
                                    <span className="flex justify-between items-center gap-2">
                                        <input type="file" accept=".jpg, .jpeg, .png, .webp" onChange={handleImageChange} className={`${errors.image ? "border-red-500" : null} file-input`} />
                                        {previewImage && <img className="size-12 rounded" src={previewImage} alt={blogData?.category} />}
                                        {errors.image && <p className={errors.image ? "text-red-500 text-sm" : ""}>{errors.image.message?.toString()}</p>}
                                    </span>
                                </div>
                                <label className={`${errors.content ? "text-red-500 font-semibold" : null} fieldset-label text-sm mt-3`}>Content {errors.content ? "*" : null}</label>
                                <textarea className={`${errors.content ? "focus:outline-red-500 border-red-500" : null} textarea w-full`} {...register("content")} rows={6} />
                                {
                                    updateLoading ?
                                        <button type="button" title="Updating..." className="btn btn-neutral opacity-90 mt-4"><span className="loading loading-bars loading-lg"></span></button>
                                        :
                                        <button type="submit" className="btn btn-neutral mt-4">Update</button>

                                }
                            </fieldset>
                        </form>
                    </div>
            }
        </dialog >
    )
}

export default EditBlogModal;