
interface IBookmark {
    id: string;
    image: string;
    title: string;
    author: string;
}

const BookmarkTable = ({ bookmarks }: { bookmarks: IBookmark[] }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Author</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {
                    bookmarks.length > 0 ?
                        bookmarks?.map((bookmark) => (
                            <tr key={bookmark.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="w-10 h-10">
                                        <img
                                            src={bookmark.image}
                                            alt={bookmark.title}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {bookmark.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {bookmark.author}
                                </td>
                                <td className="flex justify-end items-center gap-3 px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-green-500 hover:text-green-700 font-medium">Read</button>
                                    <button className="text-red-500 hover:text-red-700 font-medium">Remove</button>
                                </td>
                            </tr>
                        ))
                        :
                        <tr>No Bookmark Blog</tr>
                }
            </tbody>
        </table>
    )
}

export default BookmarkTable;
// <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-100">
//         <tr>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
//             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Author</th>
//             <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
//         </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//         {
//             bookmarks.length > 0 ?
//                 bookmarks?.map((bookmark: IBookmark) => (
//                     <tr key={bookmark.id} className="hover:bg-gray-50 transition">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                             <img
//                                 src={bookmark.image}
//                                 alt={bookmark.title}
//                                 className="w-10 h-10 rounded-full object-cover"
//                             />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bookmark.title}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bookmark.author}</td>
//                         <td className="flex justify-end items-center gap-3 px-6 py-4 whitespace-nowrap text-right text-sm">
//                             <button className="text-green-500 hover:text-green-700 font-medium">Read</button>
//                             <button className="text-red-500 hover:text-red-700 font-medium">Remove</button>
//                         </td>
//                     </tr>
//                 ))
//                 :
//                 <tr>No Bookmark Blog</tr>
//         }
//     </tbody>
// </table>