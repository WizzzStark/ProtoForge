import CursorSVG from "@/public/assets/CursorSVG"
import { CursorChatProps, CursorMode } from "@/types/type"

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence}: CursorChatProps) => {


	const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateMyPresence({ message: e.target.value })
		setCursorState({
			mode: CursorMode.Chat,
			previousMessage: null,
			message: e.target.value,
		})

	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter"){
			setCursorState({
				mode: CursorMode.Chat,
				previousMessage: cursorState.message,
				message: "",
			})
		} else if (e.key === "Escape") {
			setCursorState({
				mode: CursorMode.Hidden,
			})
		}
	}


	return (
		<div 
			className="absolute top-0 left-0"
			style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
		>
			{cursorState.mode === CursorMode.Chat && (
			<>
				<div 
					className=" absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]"
					onKeyUp={(e) => {e.stopPropagation()}}
					>

					{cursorState.previousMessage && (
						<div>{cursorState.previousMessage}</div>
					)}

				<input 
					className="w-60 z-10 border-none bg-transparent text-white placeholder-blue-300 outline-none"
					autoFocus={true}
					onChange={hanldeChange}
					onKeyDown={handleKeyDown}
					placeholder={cursorState.previousMessage ? "" : "Type a message..."}
					value={cursorState.message}
					maxLength={50}
				
				/>
				</div>
			</>
			)}
		</div>
	)
}

export default CursorChat