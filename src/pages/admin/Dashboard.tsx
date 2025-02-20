import { toast } from "sonner";
import { useDashboardStaticsQuery } from "../../redux/features/admin/dashboard/dashboard";
import moment from "moment";

const Dashboard = () => {
    const { data, isLoading, isError } = useDashboardStaticsQuery(undefined);

    if (isError) return toast.error("Cannot fetch the data!");

    return (
        <section className="mt-10">
            <div className="flex justify-evenly flex-col md:flex-row">
                <div className={`${isLoading ? "border-0" : "border"} bg-base-200 flex justify-evenly items-center w-60 h-32 rounded-xl`}>
                    {
                        isLoading ?
                            <div className="skeleton w-60 h-32"></div>
                            :
                            <>
                                <span>
                                    <h1 className="text-xl inter font-[800] mb-2">USER</h1>
                                    <h2 className="text-xl montserrat font-[700]">{data?.data?.user}</h2>
                                </span>
                                <img className="size-10" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/user--v1.png" alt="user--v1" />
                            </>
                    }
                </div>
                <div className={`${isLoading ? "border-0" : "border"} bg-base-200 flex justify-evenly items-center w-60 h-32 rounded-xl`}>
                    {
                        isLoading ?
                            <div className="skeleton w-60 h-32"></div>
                            :
                            <>
                                <span>
                                    <h1 className="text-xl inter font-[800] mb-2">BLOG</h1>
                                    <h2 className="text-xl montserrat font-[700]">{data?.data?.blog}</h2>
                                </span>
                                <img className="size-10" src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/1A1A1A/external-blog-content-creator-xnimrodx-lineal-xnimrodx.png" alt="external-blog-content-creator" />
                            </>
                    }
                </div>
            </div>
            {
                isLoading ?
                    <div className="skeleton w-[90%] h-80 mx-auto mt-12"></div>
                    :
                    <div className="overflow-auto rounded-box border border-base-content/80 bg-base-200 w-[90%] mx-auto mt-15">
                        <h1 className="text-xl inter font-[800] p-5">Top Blog</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Blog Title</th>
                                    <th>Category</th>
                                    <th>Like</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>CreateAt</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.topBlogs.map((blog: any) => (
                                        <tr key={blog?._id}>
                                            <td><img className="w-12 h-12 rounded-full border" src={blog?.image?.url} alt={blog?.title} /></td>
                                            <td>{blog?.title}</td>
                                            <td>{blog?.category}</td>
                                            <td>{blog?.likes}</td>
                                            <td>{blog?.author}</td>
                                            <td>{blog?.isPublished ? <p className="text-green-500 montserrat font-[700]">Publish</p> : <p className="text-red-500 montserrat font-[700]">Un-publish</p>}</td>
                                            <td>{moment(blog?.createdAt).format("D MMM Y")}</td>
                                            <td><button className="btn btn-outline">View</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </section>
    )
}

export default Dashboard;