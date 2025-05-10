const ViewBlogSkeleton = () => (
    <section className="bg-base-200 w-[50%] mx-auto p-10 animate-pulse">
        <div className="btn btn-sm btn-outline mb-10 w-24 h-8 bg-gray-300" />
        <div className="flex items-center gap-x-4 mb-8">
            <div className="size-14 rounded-full bg-gray-300" />
            <div>
                <div className="h-4 w-20 bg-gray-300 mb-2 rounded" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
        </div>
        <div className="w-[50%] h-60 bg-gray-300 mx-auto my-12 rounded" />
        <div className="h-6 w-1/2 bg-gray-300 mb-4 rounded" />
        <div className="h-4 w-40 bg-gray-300 mb-8 rounded" />
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
        </div>
        <div className="flex justify-around items-center gap-4 border-y h-10 mt-10">
            <div className="size-5 bg-gray-300 rounded-full" />
            <div className="size-5 bg-gray-300 rounded-full" />
            <div className="size-5 bg-gray-300 rounded-full" />
            <div className="size-5 bg-gray-300 rounded-full" />
        </div>
    </section>
);

export default ViewBlogSkeleton;