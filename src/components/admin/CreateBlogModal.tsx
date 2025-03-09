
const CreateBlogModal = () => {
    return (
        <dialog id="create_blog_modal" className="modal">
            <div className="modal-box overflow-auto">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                
            </div>
        </dialog >
    )
}

export default CreateBlogModal;
