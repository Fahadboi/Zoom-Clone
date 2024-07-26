import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MeetingSetup({ setIsSetupComplete }) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within stream component.");
  }
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <main className="bg-gray-800 h-screen w-full flex  items-center justify-center">
      <div className="flex flex-col gap-1 items-center text-white">
        <h1 className="text-2xl font-semibold">Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with Mic and Camera off
          </label>
          <DeviceSettings />
        </div>
        {/* TODO: Join the call. */}
        <button
          onClick={async () => {
            setIsSetupComplete(true);
            await call.join();
          }}
          className="rounded-md bg-green-500 px-4 py-2.5"
        >
          Join Meeting
        </button>
      </div>
    </main>
  );
}
