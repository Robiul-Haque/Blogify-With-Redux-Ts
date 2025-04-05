import { useLocation, useNavigate, useParams } from "react-router";
import { useAddBookmarkBlogMutation, useCreateCommentMutation, useCreateLikeMutation, useDeleteLikeMutation, useGetBlogQuery, useRemoveBookmarkBlogMutation } from "../../redux/features/user/userApi";
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
    const [isOpenShareMenu, setIsOpenShareMenu] = useState<boolean>(false);
    const { pathname } = useLocation();
    const blogUrl = `${window.location.origin}${pathname}`;
    const [isCopyLinkAlert, setIsCopyLinkAlert] = useState<boolean>(false);
    const [bookmarked, setBookmarked] = useState<boolean>(false);
    const [addBookmarkBlog] = useAddBookmarkBlogMutation();
    const [removeBookmarkBlog] = useRemoveBookmarkBlogMutation();
    const navigate = useNavigate();

    useEffect(() => {
        // Count total likes
        const activeLikes = blogData?.like.filter(({ isDeleted }: { isDeleted: boolean }) => !isDeleted).length;
        setTotalLikes(activeLikes);

        // Check if the user has already liked the blog
        const userLiked = blogData?.like.some(({ user, isDeleted }: { user: string; isDeleted: boolean }) => user === userId && !isDeleted);
        setIsLiked(userLiked);

        // Check if the user has already commented
        setComments(blogData?.comment || []);

        if (blogData?.author?.bookmark?.includes(blogData?.blog?._id)) {
            setBookmarked(true);
        }
    }, [blogData?.like, userId, blogData?.comment, blogData?.author?.bookmark, blogData?.blog?._id]);

    const handleLike = (userId: string | null, blogId: string, totalLikes: number): void => {
        setIsLiked(!isLiked);
        setTotalLikes(totalLikes);
        createLike({ blog: blogId, user: userId });
    }

    const handleAddComment = (): void => {
        if (!newComment) return;

        createComment({ blog: blogData?.blog?._id, user: userId, comment: newComment })
            .unwrap()
            .then(() => setNewComment(""));
    };

    const handleCopyLink = (): void => {
        navigator.clipboard.writeText(blogUrl);
        setIsCopyLinkAlert(true);
        setTimeout(() => {
            setIsCopyLinkAlert(false);
        }, 2500);
    };

    const handleAddBookmark = (blog: string, user: string | null): void => {
        // Logic to add bookmark to the database
        if (userId) {
            addBookmarkBlog({ blog, user })
                .unwrap()
                .then(() => setBookmarked(true));
        } else {
            navigate("/login");
        }
    }

    const handleRemoveBookmark = (blog: string, user: string | null): void => {
        // Logic to remove bookmark from the database
        if (userId) {
            removeBookmarkBlog({ blog, user })
                .unwrap()
                .then(() => setBookmarked(false));
        } else {
            navigate("/login");
        }
    }

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
                <span className="relative">
                    <img onClick={() => setIsOpenShareMenu(!isOpenShareMenu)} className="size-5 cursor-pointer" title="Share" src="https://img.icons8.com/fluency-systems-filled/50/share-3.png" alt="share-3" />
                    {
                        isOpenShareMenu && <div className="absolute top-8 left-[-90px] w-50 bg-base-200 rounded-lg shadow-lg p-3 flex justify-around items-center gap-3">
                            <span className="cursor-pointer">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:opacity-80">
                                    <img className="size-7" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/facebook-new.png" alt="facebook-new" title="Facebook" />
                                </a>
                            </span>
                            <span className="cursor-pointer">
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:opacity-80">
                                    <img className="size-7" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/linkedin-circled--v1.png" alt="linkedin-circled--v1" title="Linkedin" />
                                </a>
                            </span>
                            <span className="cursor-pointer">
                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blogData?.blog?.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:opacity-80">
                                    <img className="size-7" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/twitter-circled--v1.png" alt="twitter-circled--v1" title="Twitter" />
                                </a>
                            </span>
                            <img className="size-7 cursor-pointer" title="Copy Link" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/copy.png" alt="copy" onClick={() => handleCopyLink()} />
                            {
                                isCopyLinkAlert &&
                                <div className="absolute top-[60px] left-[1px] w-51 bg-base-100 text-black text-sm font-semibold rounded-lg p-2 shadow-md">Blog link copied to clipboard!</div>
                            }
                        </div>
                    }
                </span>
                {
                    bookmarked && userId ?
                        <img onClick={() => handleRemoveBookmark(blogData?.blog?._id, userId)} className="size-5 cursor-pointer" title="Remove Bookmark" src="https://img.icons8.com/ios-glyphs/30/bookmark-ribbon.png" alt="bookmark-ribbon" />
                        :
                        <img onClick={() => handleAddBookmark(blogData?.blog?._id, userId)} className="size-5 cursor-pointer" title="Bookmark" src="https://img.icons8.com/windows/32/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" />
                }
            </div>
            <div className="max-w-2xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-2">
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