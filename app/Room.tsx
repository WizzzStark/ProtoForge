"use client";

import { ReactNode } from "react";
import { RoomProvider, LiveblocksProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";
import Loader from "@/components/Loader";
import { createRoomId } from '../lib/createRoomId'

export function Room({ children }: { children: ReactNode }) {
  const roomId = 'protoforge-' + createRoomId()

  return (
    <LiveblocksProvider>
      <RoomProvider id={roomId}
        initialPresence={{ cursor: null, message: "" }}
        initialStorage={{ canvasObjects: new LiveMap }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}