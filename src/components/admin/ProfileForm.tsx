import { useViewProfileInfoQuery } from "../../redux/features/admin/profile";

const ProfileForm = () => {
    const { data, isLoading } = useViewProfileInfoQuery(undefined);
    console.log(data);

    return (
        <form className="flex items-center flex-col">
            <div className="w-[90%] px-5.5">
                <label className="fieldset-label mb-2.5">Name</label>
                <input type="text" className="input" />
            </div>

            <div className="w-[90%] px-5.5 py-5 relative">
                <label className="fieldset-label mb-2.5">Email</label>
                <input type="email" className="input focus:outline-none focus:border-gray-300" readOnly title="Can,t change this field value" />
                <p className="badge badge-soft badge-neutral badge-xs font-semibold absolute right-10 top-10">Admin</p>
            </div>

            <div className="w-[90%] px-5.5 pb-4">
                <label className="fieldset-label mb-2.5">Image</label>
                <input type="file" className="file-input" />
            </div>

            <button className="btn btn-neutral mt-4">Update</button>
        </form>
    )
}

export default ProfileForm;
