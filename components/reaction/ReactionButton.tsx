import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
  x: number;
  y: number;
};

export default function ReactionSelector({ setReaction, x, y }: Props) {
  return (
    <div
      className="absolute top-0 left-5 mx-auto w-fit transform rounded-full bg-white px-2"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction="👍" onSelect={setReaction}/>
      <ReactionButton reaction="🔥" onSelect={setReaction}/>
      <ReactionButton reaction="😍" onSelect={setReaction}/>
      <ReactionButton reaction="👀" onSelect={setReaction}/>
      <ReactionButton reaction="😱" onSelect={setReaction}/>
      <ReactionButton reaction="🙁" onSelect={setReaction}/>
    </div>
  );
}

function ReactionButton(
  {
    reaction,
    onSelect,
  }: {
    reaction: string;
    onSelect: (reaction: string) => void;
  }
) {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  );
}