import CreateBlogModal from "../../components/admin/CreateBlogModal";
import AllBlogTable from "../../components/admin/AllBlogTable";

const Blog = () => {
    return (
        <>
            <section className="flex justify-between items-center gap-2 my-5">
                <div>Bradcamp</div>
                <h2 className="text-2xl text-neutral-500 font-semibold">All Blogs</h2>
                <button onClick={() => {
                    const modal = document.getElementById("create_blog_modal");
                    if (modal) (modal as HTMLDialogElement).showModal();
                }} type="button" className="btn btn-sm btn-primary"><img className="size-5" src="https://img.icons8.com/material-rounded/24/FFFFFF/create-new.png" alt="create-new" /> Create Blog</button>
            </section>
            <CreateBlogModal />
            <AllBlogTable />
        </>
    )
}

export default Blog;