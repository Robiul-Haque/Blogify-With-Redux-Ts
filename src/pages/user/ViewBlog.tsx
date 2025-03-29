import { useParams } from "react-router";
import { useCreateCommentMutation, useCreateLikeMutation, useDeleteLikeMutation, useGetBlogQuery } from "../../redux/features/user/userApi";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

type TComment = {
    comment: string;
    user: {
        name: string;
        image: {
            url: string;
            publicId: string;
        }
    }
}

const ViewBlog = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetBlogQuery(id ? { id } : { id: "" });
    const { data: blogData } = data || {};
    const [totalLikes, setTotalLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { id: userId } = useAppSelector((state: RootState) => state.auth);
    const [createLike] = useCreateLikeMutation();
    const [deleteLike] = useDeleteLikeMutation();
    const [comments, setComments] = useState<TComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [createComment] = useCreateCommentMutation();

    useEffect(() => {
        // Count total likes
        const activeLikes = blogData?.like.filter(({ isDeleted }: { isDeleted: boolean }) => !isDeleted).length;
        setTotalLikes(activeLikes);

        // Check if the user has already liked the blog
        const userLiked = blogData?.like.some(({ user, isDeleted }: { user: string; isDeleted: boolean }) => user === userId && !isDeleted);
        setIsLiked(userLiked);

        // Check if the user has already commented
        setComments(blogData?.comment || []);
    }, [blogData?.like, userId, blogData?.comment]);

    const handleLike = (userId: string | null, blogId: string, totalLikes: number): void => {
        setIsLiked(!isLiked);
        setTotalLikes(totalLikes);
        createLike({ blog: blogId, user: userId })
            .unwrap()
            .then()
    }

    const handleAddComment = () => {
        if (!newComment) return;
        console.log("New Comment: ", { blog: blogData?.blog?._id, user: userId, comment: newComment });
        createComment({ blog: blogData?.blog?._id, user: userId, comment: newComment })
            .unwrap()
            .then(() => setNewComment(""))
    };

    return (
        <section className="bg-base-200 w-[50%] mx-auto p-10">
            <span className="btn btn-sm btn-outline cursor-pointer mb-10" onClick={() => window.history.back()}>
                <img className="size-5" src="https://img.icons8.com/material-rounded/24/back--v1.png" alt="back--v1" />
                <p>Back</p>
            </span>
            <div className="flex items-center gap-x-4">
                <img src={blogData?.author?.image?.url} alt={blogData?.author?.image?.publicId} className="size-14 rounded-full" />
                <span>
                    <h1 className="text-sm font-semibold">Author</h1>
                    <h1 className="text-sm font-semibold my-0.5">{blogData?.author?.name}</h1>
                    <p className="text-xs capitalize bg-base-100 badge">{blogData?.author?.role}</p>
                </span>
            </div>
            <img src={blogData?.blog?.image?.url} alt={blogData?.blog?.image?.url} className="my-12 mx-auto w-[50%] h-[50%] object-fill" />
            <h2 className="text-2xl font-bold">{blogData?.blog?.title}</h2>
            <span className="flex justify-between items-center gap-x-4 my-5">
                <p className="badge font-semibold">Category: {blogData?.blog?.category}</p>
                <p className="badge font-semibold">Publish: {moment(blogData?.blog?.createdAt).format("D MMM Y")}</p>
            </span>
            <p className="my-10">{blogData?.blog?.content}</p>
            <div className="flex justify-around items-center gap-4 border-y h-10 mb-10">
                <span className="flex items-center gap-2">
                    {
                        isLiked ?
                            <img onClick={() => { deleteLike(blogData?.like[0]?._id); setTotalLikes(totalLikes - 1) }} className="size-5 cursor-pointer" title="Unlike" src="https://img.icons8.com/material/24/facebook-like--v1.png" alt="facebook-like--v1" />
                            :
                            <img onClick={() => handleLike(userId, blogData?.blog?._id, totalLikes + 1)} className="size-5 cursor-pointer" title="Like" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1" />
                    }
                    {totalLikes}
                </span>
                <span className="flex items-center gap-2">
                    <img className="size-5 cursor-pointer" title="Comment" src="https://img.icons8.com/windows/32/speech-bubble--v1.png" alt="speech-bubble--v1" />
                    {blogData?.blog?.comments.length}
                </span>
                <img className="size-5 cursor-pointer" title="Share" src="https://img.icons8.com/fluency-systems-filled/50/share-3.png" alt="share-3" />
                <img className="size-5 cursor-pointer" title="Bookmark" src="https://img.icons8.com/windows/32/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" />
                {/* <img className="size-5 cursor-pointer" title="Remove Bookmark" src="https://img.icons8.com/ios-glyphs/30/bookmark-ribbon.png" alt="bookmark-ribbon" /> */}
            </div>
            <div className="max-w-2xl mx-auto px-4 sm:px-4 lg:px-6 py-2">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <div className="flex items-start space-x-2 mb-10">
                    <div className="flex-1">
                        <textarea className="w-full p-2 border rounded-lg focus:ring-2 focus:border-black-500 focus:outline-none resize-none" rows={3} placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <button className="mt-2 btn btn-neutral btn-sm" onClick={handleAddComment}>Post Comment</button>
                    </div>
                </div>
                <div className="space-y-4">
                    {comments.map(({ comment, user }: TComment, index) => (
                        <div key={index} className="flex items-start space-x-3 border-b pb-3">
                            <img src={user?.image?.url} alt={`${user?.name}'s Avatar`} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-gray-700">{comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ViewBlog;