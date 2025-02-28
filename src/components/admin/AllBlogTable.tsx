import { useAllBlogQuery } from "../../redux/features/admin/blog";
import moment from "moment";

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
    createdAt: string;
    updatedAt: string;
}

const AllBlogTable = () => {
    const { data, isLoading } = useAllBlogQuery(undefined);
    const { data: AllBlog } = data || {};

    if (isLoading) return <h2>Loading...</h2>;

    const handleViewBlog = (id: string) => {
        console.log(id);
    }

    return (
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
                        <th className="w-48">Name</th>
                        <th className="w-48">Content</th>
                        <th className="w-45">Category</th>
                        <div className="flex justify-center items-center gap-3 w-42">
                            <th className="flex justify-center items-center gap-2"><img className="size-5" src="https://img.icons8.com/fluency-systems-filled/50/facebook-like.png" alt="facebook-like" /> <span>Like</span></th>
                            <th className="flex justify-center items-center gap-2"><img className="size-5" src="https://img.icons8.com/ios-glyphs/30/speech-bubble--v1.png" alt="speech-bubble--v1" /> Comment</th>
                        </div>
                        <th>Status</th>
                        <th>createAt</th>
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
                                    <img src={blog?.image?.url} alt={blog.title} className="size-11 rounded-full border-2" />
                                </td>
                                <td title={blog?.title}>{blog?.title?.split(" ").length > 10 ? `${blog?.title?.split(" ").slice(0, 10).join(" ")}...` : blog.title}</td>
                                <td title={blog?.content}>{blog?.content?.split(" ").length > 11 ? `${blog?.content?.split(" ").slice(0, 6).join(" ")}...` : blog.title}</td>
                                <td title={blog?.category}>{blog?.category}</td>
                                <div className="flex justify-around items-center gap-1 w-42">
                                    <td className="font-semibold">{blog?.likes}</td>
                                    <td className="font-semibold">{blog?.comments?.length}</td>
                                </div>
                                <td>{!blog?.isPublished ? <p className="text-green-500 font-bold">Publish</p> : <p className="text-red-500 font-bold">Not Publish</p>}</td>
                                <td>{moment(blog?.createdAt).format("D MMM Y")}</td>
                                <td className="flex justify-center max-sm:flex-col gap-3 mt-1">
                                    <button onClick={() => handleViewBlog(blog?._id)} title="View" className="btn btn-success btn-sm"><img className="size-5" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/visible--v1.png" alt="visible--v1" /></button>
                                    <button title="Edit" className="btn btn-primary btn-sm"><img className="size-5" src="https://img.icons8.com/material-sharp/24/FFFFFF/edit--v1.png" alt="edit--v1" /></button>
                                    <button title="Delete" className="btn btn-error btn-sm"><img className="size-5" src="https://img.icons8.com/material-rounded/24/FFFFFF/filled-trash.png" alt="filled-trash" /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllBlogTable;