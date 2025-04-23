import BookmarkTable from "../../components/user/BookmarkTable";

const Bookmark = () => {
    const bookmarks = [
        {
            id: "1",
            title: "Tailwind CSS Tutorial",
            author: "John Doe",
            image: "https://via.placeholder.com/40",
        },
        {
            id: "2",
            title: "React Hooks Guide",
            author: "Jane Smith",
            image: "https://via.placeholder.com/40",
        },
        {
            id: "3",
            title: "JavaScript ES6+",
            author: "Mark Wilson",
            image: "https://via.placeholder.com/40",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <BookmarkTable bookmarks={bookmarks} />
            </div>
        </div>
    )
}

export default Bookmark;