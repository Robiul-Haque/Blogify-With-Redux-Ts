import { useState } from "react";
import AllUserTable from "../../components/admin/AllUserTable";

const User = () => {
    const [userFilterSearch, setUserFilterSearch] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <section className="flex items-center gap-2 my-5">
                <div className="flex justify-end w-[50%]">
                    <h2 className="text-2xl text-neutral-500 font-semibold">All Users</h2>
                </div>
                <div className="flex justify-end items-center gap-5 w-[50%] pr-1">
                    <select onChange={(e) => setUserFilterSearch(e.target.value)} className="select select-sm w-30 cursor-pointer">
                        <option selected value="">All User</option>
                        <option value="active">Active</option>
                        <option value="block">Block</option>
                    </select>
                    <label className="input input-sm w-60">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input type="search" onChange={(e) => setSearch(e.target.value)} required placeholder="Search By User Name or Email" />
                    </label>
                </div>
            </section>
            <AllUserTable userFilterSearch={userFilterSearch} search={search} />
        </>
    )
}

export default User;