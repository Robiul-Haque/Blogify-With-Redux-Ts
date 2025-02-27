import { useAllUserQuery, useBlockUserMutation } from "../../redux/features/admin/user";

const AllUserTable = () => {
    const { data: allUsers, isLoading } = useAllUserQuery(undefined);
    const [blockUser] = useBlockUserMutation();
    if (isLoading) return <div>Loading...</div>
    console.log("All User: ", allUsers.data);

    const handleBlockedUser = (id: string, status: boolean) => {
        blockUser({ id, status });
    }

    const handleDeleteUser = (id: string) => {
        console.log("Delete User: ", id);
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Account</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.data.map((user: any) => (
                            <tr key={user?._id} className="hover:bg-gray-50">
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <img src={user?.image?.url} alt={user?.name} className="size-14 rounded-full border mx-auto" />
                                </td>
                                <td>
                                    <div className="flex items-center flex-col gap-y-2 inter font-[600]">
                                        <span>{user?.name}</span>
                                        <p className="text-green-400 bg-green-100/50 text-xs badge capitalize">{user?.role}</p>
                                    </div>
                                </td>
                                <td>
                                    <p>{user?.email}</p>
                                </td>
                                <td className="w-30">
                                    <div className="flex justify-center items-center flex-col gap-y-2">
                                        <label className={`${user?.isBlocked ? "border-red-400" : "border-green-400"} toggle text-base-content border rounded-full`}>
                                            <input type="checkbox" onChange={(e) => handleBlockedUser(user?._id, e.target.checked)} />
                                            <svg className="bg-green-400 rounded-full" aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"></path></g></svg>
                                            <svg className="bg-red-400 rounded-full" aria-label="disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </label>
                                        <p>{user?.isBlocked ? <p className="text-red-400 bg-red-100/40 text-xs badge font-bold">Block</p>
                                            :
                                            <p className="text-green-400 bg-green-100/40 text-xs badge font-bold">Active</p>}</p>
                                    </div>
                                </td>
                                <th>
                                    {
                                        user?.isVerified ?
                                            <p className="text-green-400 font-bold">Verified</p>
                                            :
                                            <p className="text-red-400 bg-red-100/40 text-xs badge font-bold">Not Verified</p>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteUser(user?._id)} title="Delete" className="btn btn-sm bg-red-200 hover:bg-red-400"><img className="size-5" src="https://img.icons8.com/material-rounded/50/filled-trash.png" alt="filled-trash" /></button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default AllUserTable;