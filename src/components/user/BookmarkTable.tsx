import { Link } from "react-router-dom";
import { useDeleteBookmarkBlogMutation } from "../../redux/features/blog/blogApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Swal from "sweetalert2";

interface IBookmark {
    _id: string;
    image: { url: string; };
    title: string;
    author: { name: string };
}

const BookmarkTable = ({ bookmarks }: { bookmarks: IBookmark[] }) => {
    const [deleteBookmarkBlog] = useDeleteBookmarkBlogMutation();
    const { id: userId } = useAppSelector((state: RootState) => state.auth);

    const deleteBookmark = (id: string): void => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "",
            confirmButtonText: "Yes, Remove Bookmark"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBookmarkBlog({ userId, blogId: id })
                    .unwrap()
                    .then(() => { })
                    .catch((error) => {
                        console.error("Failed to delete bookmark", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Title</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Author</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 pr-10">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {
                    bookmarks?.length > 0 ?
                        bookmarks?.map((bookmark, index) => (
                            <tr key={bookmark?._id} className="hover:bg-gray-50 transition">
                                <td className="ps-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <div className="size-14">
                                        <img
                                            src={bookmark?.image?.url}
                                            alt={bookmark?.title}
                                            className="size-14 rounded-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {bookmark?.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {bookmark?.author?.name}
                                </td>
                                <td className="flex justify-end items-center gap-6 px-6 pt-8 whitespace-nowrap text-right text-sm">
                                    <Link to={`/blog/${bookmark?._id}`}><img title="Read" className="cursor-pointer size-6" src="https://img.icons8.com/material-rounded/24/read.png" alt="read" /></Link>
                                    <img onClick={() => deleteBookmark(bookmark?._id)} title="Remove" className="cursor-pointer size-6" src="https://img.icons8.com/ios-glyphs/30/delete-forever.png" alt="delete-forever" />
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={5} className="py-4 font-semibold text-lg">No Bookmark Blog</td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default BookmarkTable;