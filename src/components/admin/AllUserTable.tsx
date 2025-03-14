import Swal from "sweetalert2";
import { useAllUserQuery, useBlockUserMutation, useDeleteUserMutation } from "../../redux/features/admin/user";

type TUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    image: {
        url: string;
    };
    isDeleted: boolean;
    isBlocked: boolean;
    isVerified: boolean;
    totalBlogs: number;
    createdAt: string;
    updatedAt: string;
}

const AllUserTable = ({ userFilterSearch, search }: { userFilterSearch: string, search: string }) => {
    const { data: allUsers, isLoading } = useAllUserQuery({ userFilter: userFilterSearch, search: search });
    const [blockUser, { isLoading: blockUserLoading }] = useBlockUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleBlockedUser = (id: string, status: boolean): void => {
        blockUser({ id, status });
    }

    const handleDeleteUser = (id: string): void => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }).catch(() => {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong!",
                        icon: "error"
                    });
                });
            }
        });
    }

    return (
        <div className="overflow-x-auto">
            {
                isLoading ? <div className="skeleton w-[90%] h-80 mx-auto mt-5"></div>
                    :
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Account</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers?.data?.map((user: TUser) => (
                                    <tr key={user?._id} className="hover:bg-gray-50">
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <img src={user?.image?.url} alt={user?.name} className={`${user?.role === "admin" ? "border-indigo-500" : user?.role === "author" ? "border-blue-500" : "border-green-500"} size-14 rounded-full border-3 mx-auto`} />
                                        </td>
                                        <td>
                                            <div className="flex items-center flex-col gap-y-2 inter font-[600]">
                                                <span>{user?.name}</span>
                                                <p className={`${user?.role === "admin" ? " text-white bg-indigo-500" : user?.role === "author" ? "text-blue-500 bg-blue-100/50" : "text-green-500 bg-green-100/50"} text-xs badge capitalize`}>{user?.role}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{user?.email}</p>
                                        </td>
                                        <td className="w-30">
                                            <div className="flex justify-center items-center flex-col gap-y-2">
                                                {
                                                    user?.role === "admin" ?
                                                        null
                                                        :
                                                        blockUserLoading ?
                                                            <span className="loading loading-bars loading-xs h-6"></span>
                                                            :
                                                            <label className={`${user?.isBlocked ? "border-red-400" : "border-green-400"} toggle text-base-content border rounded-full`}>
                                                                <input type="checkbox" checked={user?.isBlocked} onChange={(e) => handleBlockedUser(user?._id, e.target.checked)} />
                                                                <svg className="bg-green-400 rounded-full" aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="green" stroke="currentColor"><path d="M20 6 9 17l-5-5"></path></g></svg>
                                                                <svg className="bg-red-400 rounded-full" aria-label="disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                            </label>
                                                }
                                                {
                                                    user?.isBlocked ?
                                                        <p className="text-red-400 bg-red-100/40 text-xs badge font-bold">Block</p>
                                                        :
                                                        <p className="text-green-400 bg-green-100/40 text-xs badge font-bold">Active</p>
                                                }
                                            </div>
                                        </td>
                                        <th>
                                            {
                                                user?.isVerified ?
                                                    <p className="text-green-400 font-bold">Verified</p>
                                                    :
                                                    <p className="text-red-400 font-bold">Not Verified</p>
                                            }
                                        </th>
                                        <th>
                                            {
                                                user?.role !== "admin" ?
                                                    <button onClick={() => handleDeleteUser(user?._id)} title="Delete" className="btn btn-sm bg-red-400 hover:bg-red-500"><img className="size-5" src="https://img.icons8.com/material-rounded/24/FFFFFF/filled-trash.png" alt="filled-trash" /></button>
                                                    :
                                                    null
                                            }
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div >
    )
}

export default AllUserTable;