import { useGetAllBlogQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Blog = () => {
    const { searchName } = useAppSelector((state: RootState) => state.user);
    const { data, isLoading } = useGetAllBlogQuery(searchName ? { name: searchName } : { name: "" });
    const { data: allBlog } = data || {};
    console.log("Get data form redux store: ", searchName);

    return (
        <div className="flex justify-between gap-20 flex-wrap m-15 p-20 bg-gray-100 rounded-2xl">
            {
                isLoading ? <div className="skeleton mx-auto"></div>
                    :
                    allBlog?.map((item: any) => {
                        return (
                            <div key={item?._id} className="card bg-base-100 w-96 h-[420px] shadow-sm">
                                <figure>
                                    <img
                                        src={item?.image?.url}
                                        alt={item?.title}
                                        className="object-cover w-full" />
                                </figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title">{item?.title}</h2>
                                    <p>{item?.content}</p>
                                    <div className="card-actions mt-2">
                                        <button className="btn btn-naturl">Read More</button>
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