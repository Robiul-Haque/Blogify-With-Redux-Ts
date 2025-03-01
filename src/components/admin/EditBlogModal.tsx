import { useViewBlogForUpdateQuery } from "../../redux/features/admin/blog";

const EditBlogModal = ({ id }: { id: string }) => {
    const { data, isLoading } = useViewBlogForUpdateQuery(id);
    const { data: blogData } = data || {};
    console.log(blogData);

    return (
        <dialog id="edit_blog_modal" className="modal">
            {
                isLoading ?
                    <div className="skeleton w-[33%] h-96 mx-auto mt-12"></div>
                    :
                    <div className="modal-box h-[90%] overflow-auto">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h1>Edit Blog modal id: {id}</h1>
                    </div>
            }
        </dialog>
    )
}

export default EditBlogModal;