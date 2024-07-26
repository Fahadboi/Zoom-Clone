import CreateMeeting from "./CreateMeeting";
import JoinMeeting from "./JoinMeeting";

export default function Home() {

  return (
    <section className="bg-gray-800  h-[100vh] w-full">
    <div className="flex flex-col items-center pt-36">
      <div>
        <h1 className="text-4xl font-semibold text-white ">Zoom Clone</h1>
      </div>
      <div className=" gap-7 flex mt-10">
        <CreateMeeting />
        <JoinMeeting />
      </div>
    </div>
    </section>
  );
}
