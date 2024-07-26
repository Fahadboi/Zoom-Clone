import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { cn } from "./lib/utils";
import { LayoutList } from "lucide-react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "./Providers/StreamProvider";

// eslint-disable-next-line react/prop-types
export default function MeetingRoom() {
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const user = useUser();
  const call = useCall();
  const navigate = useNavigate();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();


  console.log("Calling State: ", callingState);
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleLeave = async () => {
    try {
      console.log("Leaving call...");
      navigate("/Home");
      console.log("Call left successfully, navigating to Home.");
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-gray-700">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center mb-20">
          <CallLayout />
        </div>
        <div
          className={cn("h-[cal(100vh-16px)] hidden ml-2", {
            block: showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
            <CallControls onLeave={handleLeave} />
          <DropdownMenu>    
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className=" text-white" />
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent className="border-2 border-blue-950 text-black">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => {
                return (
                  <div key={index}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setLayout(item.toLowerCase());
                      }}
                    >
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <User size={20} className="text-white" />
            </div>
          </button>
          {user.role === "admin" ? (
            <button
              className="bg-red-500 px-3 py-2.5 rounded-lg"
              onClick={async () => {
                await call.endCall();
                navigate("/Home");
              }}
            >
              End call for everyone
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
