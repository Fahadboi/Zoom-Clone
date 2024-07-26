import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: self.crypto.randomUUID(),
    name: "",
    password: "",
  });

  const handleInput = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleSignIn = () => {
    if(!form.name || !form.password){
      return;
    }

    localStorage.setItem("userData", JSON.stringify(form));
    navigate("/Home");
    console.log("Successfully Logged In.");
  }


  return (
    <main className="flex justify-center items-center bg-gray-800 h-[100vh] w-full">
      <div className="bg-white rounded-xl shadow-xl w-2/6 h-2/3 flex flex-col p-10 items-center text-black">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <div className="mt-4 flex flex-col items-center">
          <div className="m-4">
            <label className="block">Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className="border-2 border-gray-500 rounded-md p-2 w-80"
              onChange={(e) =>  handleInput(e)}
            />
          </div>
          <div className="m-4">
            <label className="block">Password:</label>
            <input
              type="text"
              placeholder="Enter your Password"
              name="password"
              className="border-2 border-gray-500 rounded-md p-2 w-80"
              onChange={(e) =>  handleInput(e)}
            />
          </div>

          <button onClick={handleSignIn} className="bg-gray-800 text-white p-3 rounded-md w-full mt-4 ">Sign In</button>
        </div>
      </div>
    </main>
  );
}
