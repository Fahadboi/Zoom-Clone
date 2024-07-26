/* eslint-disable no-unused-vars */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "./Providers/StreamProvider"; // Import the custom hook
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateMeeting() {
    const client = useStreamVideoClient();
    const { toast } = useToast();
    const navigate = useNavigate();
    const user = useUser();
    const [callDetails, setCallDetails] = useState(null);

    const createMeeting = async () => {
        if (!client) {
            console.log("Client is not present.");
            return;
        }
        
        if(!user.role) {
            console.log("Server error - Please try again");
            toast({
                variant: "destructive",
                title: "Server Error",
                description: "Please try again later",
            });
            return;
        }
        if (user.role !== "admin") {
            console.log("Only admin can create a meeting.");
            toast({
                variant: "destructive",
                title: "Not Authorized",
                description: "Only Admin can create meeting.",
            });
            return;
        }

        try {
            const meetingID = self.crypto.randomUUID();
            const call = client.call("default", meetingID);

            if (!call) throw new Error("Failed to create meeting.");

            await call.getOrCreate({
                data: {
                    startsAt: new Date().toISOString(),
                    custom:{
                        createdBy: user.id,
                    }
                },
            });

            setCallDetails(call);
            navigate(`/Home/meeting/${meetingID}`);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Meeting cannot be created due to some error.",
            });
            console.log(err);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className="bg-orange-600 p-14 rounded-xl text-white">
                        <p className="text-xl font-semibold">Create Meeting</p>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Meeting</DialogTitle>
                        <DialogDescription className="text-sm">
                            Only Admin can create meeting.
                        </DialogDescription>
                        <button
                            onClick={createMeeting}
                            className="bg-blue-500 w-full py-3 rounded-md text-white"
                        >
                            Create Meeting
                        </button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
