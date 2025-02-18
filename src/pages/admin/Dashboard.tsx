const Dashboard = () => {
    return (
        <section className="mt-10">
            <div className="flex justify-evenly flex-col md:flex-row">
                <div className="bg-base-200 border flex justify-evenly items-center w-60 h-32 rounded-xl">
                    <span>
                        <h1 className="text-xl inter font-[800] mb-2">USER</h1>
                        <h2 className="text-xl montserrat font-[700]">10</h2>
                    </span>
                    <img className="size-12" src="https://img.icons8.com/ios-glyphs/30/1A1A1A/user--v1.png" alt="user--v1" />
                </div>
                <div className="bg-base-200 border flex justify-evenly items-center w-60 h-32 rounded-xl">
                    <span>
                        <h1 className="text-xl inter font-[800] mb-2">BLOG</h1>
                        <h2 className="text-xl montserrat font-[700]">10</h2>
                    </span>
                    <img className="size-12" src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/1A1A1A/external-blog-content-creator-xnimrodx-lineal-xnimrodx.png" alt="external-blog-content-creator-xnimrodx-lineal-xnimrodx" />
                </div>
            </div>
        </section>
    )
}

export default Dashboard;