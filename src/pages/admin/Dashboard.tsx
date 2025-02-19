import { toast } from "sonner";
import { useDashboardStaticsQuery } from "../../redux/features/admin/dashboard/dashboard";

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
        </section>
    )
}

export default Dashboard;