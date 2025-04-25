import BookmarkTable from "../../components/user/BookmarkTable";
import { useViewAllBookmarkBlogQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Bookmark = () => {
    const { id } = useAppSelector((state: RootState) => state.auth);
    const { data, isLoading } = useViewAllBookmarkBlogQuery(id || "");
    const { bookmark } = data?.data ?? {};

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h2 className="text-2xl font-bold mb-6">Bookmarks</h2>
            {
                isLoading ?
                    <div className="skeleton w-auto h-32 mx-auto mt-12"></div>
                    :
                    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                        <BookmarkTable bookmarks={bookmark} />
                    </div>
            }
        </div>
    )
}

export default Bookmark;