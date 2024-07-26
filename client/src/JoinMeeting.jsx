import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useToast } from "./components/ui/use-toast";
import { useNavigate } from "react-router-dom";
  
  export default function JoinMeeting() {

    const [meetingID, setMeetingID] = useState("");
    const {toast} = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
      setMeetingID(e.target.value);
    }


    const JoinMeeting = async ()=> {
      if(meetingID.length <= 0 || !meetingID){
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please Provide the Meeting ID",
        });
        return;
      }
      navigate(`/Home/meeting/${meetingID}`);
    };

    return (
      <div>
        <Dialog>
          <DialogTrigger>
              <div className="bg-purple-800 p-14 rounded-xl text-white">
                  <p className="text-xl font-semibold">Join Meeting</p>
              </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Meeting</DialogTitle>
              <DialogDescription>Enter the Meeting ID to join the meeting.</DialogDescription>
              <input placeholder="Meeting ID" className="p-3 mt-3" type="text" onChange={handleChange}/>
              <button onClick={JoinMeeting} className="bg-blue-500 hover:bg-blue-700 w-full py-3 rounded-md text-white">Join Meeting</button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  