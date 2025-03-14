import CreateBlogModal from "../../components/admin/CreateBlogModal";
import AllBlogTable from "../../components/admin/AllBlogTable";
import { useState } from "react";

const Blog = () => {
    const [searchName, setSearchName] = useState<string>("");
    const [filterBlogStatus, setFilterBlogStatus] = useState<boolean | undefined>(undefined);

    const handleFilterBlogStatus = (status: string) => {
        if (status === "true") {
            setFilterBlogStatus(true);
        } else if (status === "false") {
            setFilterBlogStatus(false);
        } else {
            setFilterBlogStatus(undefined);
        }
    }

    return (
        <>
            <section className="flex items-center gap-2 my-5">
                <div className="flex justify-end w-[50%]">
                    <h2 className="text-2xl text-neutral-500 font-semibold">All Blogs</h2>
                </div>
                <div className="flex justify-end items-center gap-5 w-[50%] pr-1">
                    <select onChange={(e) => handleFilterBlogStatus(e.target.value)} className="select select-sm w-30 cursor-pointer">
                        <option selected value="all">All Blog</option>
                        <option value="true">Publish</option>
                        <option value="false">Not Publish</option>
                    </select>
                    <label className="input input-sm w-60">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" onChange={(e) => setSearchName(e.target.value)} required placeholder="Search By Blog or Author Name" />
                    </label>
                    <button onClick={() => {
                        const modal = document.getElementById("create_blog_modal");
                        if (modal) (modal as HTMLDialogElement).showModal();
                    }} type="button" className="btn btn-sm btn-primary"><img className="size-5" src="https://img.icons8.com/material-rounded/24/FFFFFF/create-new.png" alt="create-new" /> Create Blog</button>
                </div>
            </section>
            <CreateBlogModal />
            <AllBlogTable filterBlogStatus={filterBlogStatus} searchName={searchName} />
        </>
    )
}

export default Blog;