import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from '@/liveblocks.config'
import LiveCursors from './cursor/LiveCursors'
import { useCallback, useEffect, useState } from 'react';
import CursorChat from './cursor/CursorChat';
import { CursorMode, CursorState, Reaction } from '@/types/type';
import ReactionSelector from './reaction/ReactionButton';
import FlyingReaction from './reaction/FlyingReaction';
import useInterval from '@/hooks/useInterval';
import { Comments } from './comments/Comments';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { shortcuts } from '@/constants';

type Props = {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    undo: () => void;
    redo: () => void;
};

const Live = ({ canvasRef, undo, redo }:Props) => {
    const x_offset = 220;
    const y_offset = 70;

    const [{ cursor }, updateMyPresence] = useMyPresence();
    const others = useOthers();

    const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden});
    const [reaction, setReaction] = useState<Reaction[]>([]);

    const broadcast = useBroadcastEvent();
    const [reactionSelectorPosition, setReactionSelectorPosition] = useState({ x: 0, y:0 });

    // UseState para handlar el click
    const [updateTrigger, setUpdateTrigger] = useState(Date.now());

    useInterval(() => {
        setReaction((reactions) => reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000))
    }, 1000)

    useInterval(() => {
        if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed) {
            if (cursor) {
                setReaction((reactions) =>
                    reactions.concat({
                        value: cursorState.reaction,
                        timestamp: Date.now(),
                        point: cursor,
                    })
                );

                broadcast({
                    x: cursor.x,
                    y: cursor.y,
                    value: cursorState.reaction,
                });
            }
        }
    }, 100)

    useEventListener((eventData) => {
        const event = eventData.event;

        setReaction((reactions) => reactions.concat({
            value: event.value,
            timestamp: Date.now(),
            point: {x: event.x, y: event.y}
        
        }))
    })

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();

        if(cursor == null || cursorState.mode === CursorMode.ReactionSelector){
            updateMyPresence({
                cursor: {
                  x: Math.round(event.clientX - x_offset),
                  y: Math.round(event.clientY - y_offset),
                },
            });
        }
        
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        event.preventDefault();

        updateMyPresence({
            cursor: null,
        })

    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
        updateMyPresence({
            cursor: {
              x: Math.round(event.clientX - x_offset),
              y: Math.round(event.clientY - y_offset),
            },
        });

        setCursorState((state:CursorState) =>
            cursorState.mode === CursorMode.Reaction ?
            { ...state, isPressed: true } : state
        )
    }, [cursorState.mode, setCursorState])

    const hanldePointerUp = useCallback((event: React.PointerEvent) => {
        setCursorState((state:CursorState) =>
            cursorState.mode === CursorMode.Reaction ?
            { ...state, isPressed: false } : state
        )
    }, [cursorState.mode, setCursorState])

    const setReactions = useCallback((reaction: string) => {
        setCursorState({
            mode: CursorMode.Reaction,
            reaction,
            isPressed: false,
        })
    } , [])

    const hanldeContextMenuClick = useCallback((key: string) => {
        switch (key) {
            case "Chat":
                setCursorState({ 
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: "", 
                })
                break;

            case "Reactions":
                setCursorState({ 
                    mode: CursorMode.ReactionSelector 
                })
                break;

            case "Undo":
                undo();
                break;

            case "Redo":
                redo();
                break;

            default:
                break;
        }
    }, [])


    useEffect(() => {
        const onKeyUp = (event: KeyboardEvent) => {
            if (event.key === "/") {
                setCursorState({ 
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: "", 
                })
            } else if (event.key === "Escape") {
                updateMyPresence({ message: "" })
                setCursorState({ 
                    mode: CursorMode.Hidden 
                })
            } else if (event.key === "e") {
                setCursorState({ 
                    mode: CursorMode.ReactionSelector 
                })
            }
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/") {
                event.preventDefault();
            } 
        }

        window.addEventListener("keyup", onKeyUp)
        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keyup", onKeyUp)
            window.removeEventListener("keydown", onKeyDown)
        }

    }, [updateMyPresence]);

    // UseEffect para handlar el click de la tecla e con el menu abierto y el click
    useEffect(() => {
        const handleClick = () => {
            setUpdateTrigger(Date.now());
        };
    
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === "e") {
                setUpdateTrigger(Date.now());
            }
        };
    
        document.addEventListener('click', handleClick);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // UseEffect para handlar el mover la pestaña de reaciones
    useEffect(() => {
        if (cursorState.mode === CursorMode.ReactionSelector && cursor) {
            setReactionSelectorPosition({ x: cursor.x , y: cursor.y });
        }
    }, [updateTrigger])

    return (

        <ContextMenu>
            <ContextMenuTrigger
                id='canvas'
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                onPointerUp={hanldePointerUp}
                className="flex flex-1 h-full w-full justify-center items-center overflow-hidden relative"
            >
                    <canvas ref={canvasRef}/>

                    {reaction.map((reaction, index) => (
                        <FlyingReaction 
                        key={index}
                        x={((reaction.point && reaction.point?.x) || 0) }
                        y={((reaction.point && reaction.point?.y) || 0) }
                        timestamp={reaction.timestamp}
                        value={reaction.value}
                      />
                    ))}
                    
                    {cursor && (
                        <CursorChat 
                            cursor={cursor} 
                            cursorState={cursorState}
                            setCursorState={setCursorState}
                            updateMyPresence={updateMyPresence}
                        />
                    )}

                    {cursor && cursorState.mode === CursorMode.ReactionSelector && (
                        <ReactionSelector setReaction={setReactions} x={reactionSelectorPosition.x} y={reactionSelectorPosition.y}/>
                    )}

                    <LiveCursors others={others}/>

                    <Comments />
            </ContextMenuTrigger>

            <ContextMenuContent className='right-menu-content'>
                {shortcuts.map((item) => (
                    <ContextMenuItem 
                        key={item.key}
                        onClick={() => hanldeContextMenuClick(item.name)}
                        className='right-menu-item'
                    >
                            <p>{item.name}</p>
                            <p className='text-xs text-primary-grey-300'>{item.shortcut}</p>
                    </ContextMenuItem>
                ))}
            </ContextMenuContent>

        </ContextMenu>
    )
}

export default Live