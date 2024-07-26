import 'dotenv/config';
import express from "express";
import cors from "cors";
import { StreamClient } from '@stream-io/node-sdk';




const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))



const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;


async function generateToken(id, name, role) {

    try {
        let client = new StreamClient(apiKey, secret, { timeout: 3000 });

        const newUser = {
            id,
            role,
            custom: {
                color: 'red',
            },
            name,
            image: 'link/to/profile/image',
        };

        await client.upsertUsers({
            users: {
                [newUser.id]: newUser,
            },
        });

        const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
        const token = client.createToken(id, exp);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
}


app.post("/tokenProvider", async (req, res) => {

    try {
        let { id, name } = req.body;
        console.log("ID: ", id);
        console.log("name: ", name);

        let role;

        if (name === "Fahad"){
            role = "admin";
        } else{
            role = "user";
        }

        const user = {
            id,
            name,
            role,
        }
        const token = await generateToken(id, name, role);
        return res.status(200).send({ success: true, token: token, user});

    } catch (err) {
        console.log("REQUEST FAILED: ", err);
        return res.status(400).send({ success: false, message: err.message });
    }

})


app.listen(8000, () => {
    console.log("App listening on port 8000.");
})