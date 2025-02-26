import moment from "moment";
import { useViewBlogQuery } from "../../redux/features/admin/dashboard/dashboard";

type TUserComments = {
    _id: string;
    blog: string;
    comment: string;
    createdAt: string;
    isDeleted: boolean;
    updateAt: string;
    user: {
        image: {
            url: string;
            publicId: string;
        };
        name: string;
        role: string;
    };
    __V: number;
};

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
                    <div className="modal-box h-[90%] overflow-auto">
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
                                        <div className="tooltip" data-tip={blogData?.userLike?.map((user: any) => user.name).join(", ")}>
                                            <button className="btn btn-xs inter font-[800] cursor-auto"><img className="size-4" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1" /> {blogData?.blog?.likes}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">
                                <img src={blogData?.blog?.image?.url} alt={blogData?.blog?.title} className="size-60 bg-cover mx-auto" />
                                <h3 className="inter font-[800] text-2xl text-center mt-10 mb-5">{blogData?.blog?.title}</h3>
                                <p className="text-gray-700 text-base text-center">{blogData?.blog?.content}</p>
                                <div className="max-w-2xl mx-auto p-4 mt-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Comments ({blogData?.userComment?.length})</h3>
                                    <div className="space-y-6">
                                        {blogData?.userComment?.map((comment: TUserComments) => (
                                            <div key={comment._id} className="flex items-start space-x-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                                                <img src={comment.user.image.url} alt={comment.user.name} className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700" />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="text-gray-900 text-sm font-semibold dark:text-white">{comment.user.name}</h4>
                                                        <span className="text-xs text-gray-500">{moment(comment.createdAt).format("D MMM Y")}</span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm dark:text-gray-300 mt-2">{comment.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </dialog>
    )
}

export default ViewBlogModal;