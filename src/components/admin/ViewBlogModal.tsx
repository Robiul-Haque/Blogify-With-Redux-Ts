import { useViewBlogQuery } from "../../redux/features/admin/dashboard/dashboard";

const ViewBlogModal = ({ id }: { id: string }) => {
    const { data, isLoading } = useViewBlogQuery(id);
    const { data: blogData } = data || {};
    console.log(blogData);

    return (
        <dialog id="view_blog_modal" className="modal">
            {
                isLoading ?
                    <div className="skeleton w-[33%] h-96 mx-auto mt-12"></div>
                    :
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <div className="flex items-center justify-start space-x-2">
                                <img src={blogData?.blog?.author?.image?.url} alt={blogData?.blog?.author?.name} className="size-13 rounded-full border" />
                                <div className="flex flex-col items-start gap-y-1.5">
                                    <span className="roboto font-[500] text-sm">{blogData?.blog?.author?.name}</span>
                                    <div className="flex items-center gap-x-2">
                                        <p className="capitalize text-xs roboto font-[500] bg-base-200 px-2.5 py-1 rounded-2xl">{blogData?.blog?.author?.role}</p>
                                        <p className="capitalize text-xs roboto font-[500] bg-base-200 px-2.5 py-1 rounded-2xl">Category: {blogData?.blog?.category}</p>
                                        <div className="tooltip" data-tip={blogData?.likedUser?.map((user: any) => user.name).join(", ")}>
                                            <button className="btn btn-xs inter font-[800] cursor-auto"><img className="size-4" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1" /> {blogData?.blog?.likes}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">
                                <img src={blogData?.blog?.image?.url} alt={blogData?.blog?.title} className="size-60 bg-cover mx-auto" />
                                <h3 className="inter font-[800] text-xl text-center mt-10 mb-5">{blogData?.blog?.title}</h3>
                                <p className="text-gray-700 text-base text-center">{blogData?.blog?.content}</p>
                            </div>
                        </div>
                    </div>
            }
        </dialog>
    )
}

export default ViewBlogModal;