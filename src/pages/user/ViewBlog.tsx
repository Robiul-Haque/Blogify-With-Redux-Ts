import { useParams } from "react-router";
import { useGetBlogQuery } from "../../redux/features/user/userApi";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";

const ViewBlog = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetBlogQuery(id ? { id } : { id: "" });
    const { data: blogData } = data || {};
    const [totalLikes, setTotalLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const userId = useAppSelector((state: RootState) => state.auth.id);
    console.log(totalLikes, isLiked);

    useEffect(() => {
        // Count total likes
        const activeLikes = blogData?.likes.filter((like) => !like.isDeleted).length;
        setTotalLikes(activeLikes);

        // Check if the user has already liked the blog
        const userLiked = blogData?.likes.some((like) => like.user === userId && !like.isDeleted);
        setIsLiked(userLiked);
    }, [blogData?.likes, userId]);

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
                            <img className="size-5 cursor-pointer" title="Unlike" src="https://img.icons8.com/material/24/facebook-like--v1.png" alt="facebook-like--v1" />
                            :
                            <img className="size-5 cursor-pointer" title="Like" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1" />
                    }
                    {blogData?.blog?.likes}
                </span>
                <span className="flex items-center gap-2">
                    <img className="size-5 cursor-pointer" title="Comment" src="https://img.icons8.com/windows/32/speech-bubble--v1.png" alt="speech-bubble--v1" />
                    {blogData?.blog?.comments.length}
                </span>
                <img className="size-5 cursor-pointer" title="Share" src="https://img.icons8.com/fluency-systems-filled/50/share-3.png" alt="share-3" />
                <img className="size-5 cursor-pointer" title="Bookmark" src="https://img.icons8.com/windows/32/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" />
                {/* <img className="size-5 cursor-pointer" title="Remove Bookmark" src="https://img.icons8.com/ios-glyphs/30/bookmark-ribbon.png" alt="bookmark-ribbon" /> */}
            </div>
            <div className="h-50"></div>
        </section>
    )
}

export default ViewBlog;