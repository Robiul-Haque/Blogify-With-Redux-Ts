import { useForm } from "react-hook-form";
import { useViewBlogForUpdateQuery } from "../../redux/features/admin/blog";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const blogUpdateSchema = z.object({
    title: z.string(),
    category: z.string(),
    content: z.string(),
});

type Inputs = z.infer<typeof blogUpdateSchema>;

const EditBlogModal = ({ id }: { id: string }) => {
    const { data, isLoading } = useViewBlogForUpdateQuery(id);
    const { data: blogData } = data || {};
    const { register, handleSubmit, reset, } = useForm<Inputs>(
        {
            resolver: zodResolver(blogUpdateSchema),
        }
    );
    const [previewImage, setPreviewImage] = useState<string | null>(blogData?.image?.url || null);

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
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const onSubmit = (data: any): void => {
        console.log(data);
    }

    return (
        <dialog id="edit_blog_modal" className="modal">
            {
                isLoading ?
                    <div className="skeleton w-[33%] h-96 mx-auto mt-12"></div>
                    :
                    <div className="modal-box h-[88%] overflow-auto">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-auto w-full">
                            <h1 className="text-xl font-bold absolute left-54 top-6">Edit Blog</h1>
                            <fieldset className="fieldset mx-auto w-full">
                                <label className="fieldset-label mt-3">Title</label>
                                <input type="text" className="input w-full" {...register("title", { required: true, min: 1 })} />
                                <label className="fieldset-label mt-3">Category</label>
                                <input type="text" className="input w-full" {...register("category", { required: true, min: 1 })} />
                                <div className="mt-3">
                                    <label className="fieldset-label mb-0.5">Image</label>
                                    <span className="flex justify-between items-center gap-2">
                                        <input type="file" accept=".jpg, .jpeg, .png, .webp" onChange={handleImageChange} className="file-input" />
                                        {
                                            previewImage &&
                                            <img className="size-12 rounded" src={previewImage} alt={blogData?.category} />
                                        }
                                    </span>
                                </div>
                                <label className="fieldset-label mt-3">Content</label>
                                <textarea className="textarea w-full" {...register("content", { required: true, min: 1 })} rows={6} />
                                <button type="submit" className="btn btn-neutral mt-4">Update</button>
                            </fieldset>
                        </form>
                    </div>
            }
        </dialog>
    )
}

export default EditBlogModal;