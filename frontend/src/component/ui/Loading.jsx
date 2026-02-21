const Loading = ({ width }) => {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col gap-3 items-center justify-center bg-black/30 backdrop-blur-xs">
            <h2 className="text-primary font-semibold font-poppins text-xl">Registering your Restaurant...</h2>
            <div className="w-[50%] h-3 bg-white rounded-lg flex items-center">
                <div className={`bg-orange-400 h-3 rounded-lg w-[${width}%] transition duration-75`}></div>
            </div>
        </div>
    );
};

export default Loading;