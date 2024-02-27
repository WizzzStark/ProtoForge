import { toast } from "sonner"

const Popup = ({ closePopUp }: { closePopUp: any }) => {

    const hanldeCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied to clipboard", {
            description: "Share with your friends to collaborate!",
        })

    }

    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="p-5 rounded-md bg-[#14181F] border-gray-500 border-[1px] text-gray-200 min-w-[20vw]">
                <h2 className="text-lg font-bold text-center">Welcome to ProtoForge 👋</h2>
                <img src="/assets/protoforge.png" alt="banner" className="w-full h-auto my-4" />

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Right Click the canvas to open shortcut menu </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium ml-10">👉 After using "/" or "e" use "Esc" to exit mode. </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium ml-10">👉 After selecting an emoji click on the canvas to react! </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Use </span>
                    <img src="/assets/select.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium"> for selection tool.</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Use </span>
                    <img src="/assets/rectangle.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium">to select an element and then draw in the canvas.</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Use </span>
                    <img src="/assets/text.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium">and then click on the canvas to write.</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Select an item and click </span>
                    <img src="/assets/delete.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium">to delete it.</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Use </span>
                    <img src="/assets/reset.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium">to reset the entire canvas.</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-md text-gray-200 font-sans font-medium">👉 Use </span>
                    <img src="/assets/comments.svg" alt="banner" className="w-[15px]" />
                    <span className="text-md text-gray-200 font-sans font-medium">to start start a new comments thread.</span>
                </div>

                <div className="flex items-center gap-2 mt-5">
                    <span className="text-md text-gray-200 font-sans font-medium"> Share the link if you want to collaborate in the same canvas! </span>
                </div>

                <button 
                    onClick={hanldeCopyLink}
                    className="mt-4 px-4 py-2 border-gray-500 border-[1px] text-white rounded w-full hover:bg-white hover:text-black font-sans font-semibold transition-all duration-150">
                    Copy link
                </button>
                <button 
                    onClick={closePopUp} 
                    className="mt-3 px-4 py-2 border-gray-500 border-[1px] text-white rounded w-full hover:bg-white hover:text-black font-sans font-semibold transition-all duration-150">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;