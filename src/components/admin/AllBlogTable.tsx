import { useState } from "react";
import { useAllBlogQuery, useDeleteBlogMutation } from "../../redux/features/admin/blog";
import moment from "moment";
import ViewBlogModal from "./ViewBlogModal";
import EditBlogModal from "./EditBlogModal";
import Swal from "sweetalert2";

type TBlog = {
    _id: string;
    title: string;
    image: {
        url: string;
        publicId: string;
    };
    content: string;
    category: string;
    likes: number;
    comments: string[];
    isPublished: boolean;
    author: {
        name: string;
        role: string;
    }
    createdAt: string;
    updatedAt: string;
}
const AllBlogTable = () => {
    const { data, isLoading } = useAllBlogQuery(undefined);
    const { data: AllBlog } = data || {};
    const [blogId, setBlogId] = useState<string>("");
    const [deleteBlog] = useDeleteBlogMutation();

    const handleDeleteBlog = (id: string): void => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBlog(id).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }).catch(() => {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong!",
                        icon: "error"
                    });
                });
            }
        });
    }

    return (
        <>
            {
                isLoading ?
                    <div className="skeleton w-[95%] h-80 mx-auto"></div>
                    :
                    <section>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <span className="flex justify-center gap-x-2">
                                            <th><img className="size-3.5" title="Like" src="https://img.icons8.com/fluency-systems-filled/50/facebook-like.png" alt="facebook-like" /></th>
                                            <th><img className="size-3.5" title="Comment" src="https://img.icons8.com/ios-glyphs/30/speech-bubble--v1.png" alt="speech-bubble--v1" /></th>
                                        </span>
                                        <th>Status</th>
                                        <th>Author</th>
                                        <th>Create</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AllBlog?.map((blog: TBlog) => (
                                            <tr key={blog?._id} className="hover:bg-gray-50">
                                                <td>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </td>
                                                <td>
                                                    <img src={blog?.image?.url} alt={blog.title} className="size-11" />
                                                </td>
                                                <td title={blog?.title} className="text-xs">{blog?.title?.split(" ").length > 10 ? `${blog?.title?.split(" ").slice(0, 10).join(" ")}...` : blog.title}</td>
                                                <td title={blog?.category} className="text-xs">{blog?.category}</td>
                                                <span className="flex justify-center gap-x-2">
                                                    <td className="font-semibold text-xs">{blog?.likes}</td>
                                                    <td className="font-semibold text-xs">{blog?.comments?.length}</td>
                                                </span>
                                                <td>{blog?.isPublished ? <p className="text-green-500 bg-green-100/50 font-bold text-xs badge badge-sm">Publish</p> : <p className="text-red-500 bg-red-100/50 font-bold text-xs badge badge-sm">Not Publish</p>}</td>
                                                <td className="font-semibold text-gray-500 text-xs">{blog?.author?.name}</td>
                                                <td className="text-gray-600 text-xs font-semibold">{moment(blog?.createdAt).format("D MMM Y")}</td>
                                                <td className="flex justify-center max-sm:flex-col gap-3 mt-2">
                                                    <button onClick={() => {
                                                        setBlogId(blog?._id);
                                                        const modal = document.getElementById("view_blog_modal");
                                                        if (modal) (modal as HTMLDialogElement).showModal();
                                                    }} title="View" className="btn btn-success btn-xs"><img className="size-5" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/visible--v1.png" alt="visible--v1" /></button>
                                                    <button onClick={() => {
                                                        setBlogId(blog?._id);
                                                        const modal = document.getElementById("edit_blog_modal");
                                                        if (modal) (modal as HTMLDialogElement).showModal();
                                                    }} title="Edit" className="btn btn-primary btn-xs"><img className="size-5" src="https://img.icons8.com/material-sharp/24/FFFFFF/edit--v1.png" alt="edit--v1" /></button>
                                                    <button onClick={() => handleDeleteBlog(blog?._id)} title="Delete" className="btn btn-error btn-xs"><img className="size-5" src="https://img.icons8.com/material-rounded/24/FFFFFF/filled-trash.png" alt="filled-trash" /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ViewBlogModal id={blogId} />
                        <EditBlogModal id={blogId} />
                    </section>
            }
        </>
    )
}

export default AllBlogTable;