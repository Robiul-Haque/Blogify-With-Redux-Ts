import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useGetAllBlogQuery } from "../../redux/features/blog/blogApi";

type TBlog = {
    _id: string;
    image: { url: string };
    title: string;
    content: string;
    likes: number;
    comments: { length: number }
}

const Blog = () => {
    const { searchName } = useAppSelector((state: RootState) => state.user);
    const { data, isLoading } = useGetAllBlogQuery(searchName ? { name: searchName } : { name: "" });
    const { data: allBlog } = data || {};
    const [liked, setLiked] = useState<boolean>(false);

    return (
        <div className="flex justify-start gap-14 flex-wrap m-10 p-15 bg-gray-100 rounded-2xl">
            {
                isLoading ? <div className="skeleton h-50 mx-auto"></div>
                    :
                    allBlog?.map((item: TBlog) => {
                        return (
                            <div key={item?._id} className="card bg-base-100 w-82 h-[400px] shadow-sm">
                                <figure><img src={item?.image?.url} alt={item?.title} className="object-cover w-full" /></figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">{item?.title}</h2>
                                    <p>{item?.content}</p>
                                    <div className="card-actions flex items-center gap-x-6 mt-2">
                                        <Link to={`/blog/${item?._id}`} className="btn btn-naturl btn-sm">Read More</Link>
                                        <span className="flex items-center gap-x-3">
                                            {
                                                liked ?
                                                    <img onClick={() => setLiked(false)} className="size-5 cursor-pointer" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1" />
                                                    :
                                                    <img onClick={() => setLiked(true)} className="size-5 cursor-pointer" src="https://img.icons8.com/ios-filled/50/facebook-like.png" alt="facebook-like" />
                                            }
                                            {item?.likes}
                                        </span>
                                        <span className="flex items-center gap-x-3">
                                            <img className="size-5" src="https://img.icons8.com/ios-glyphs/30/speech-bubble--v1.png" alt="speech-bubble--v1" />
                                            {item?.comments.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Blog;