import express, { json } from "express"
import cors from "cors"
import { StreamChat } from "stream-chat"
import { v4 as uuidv4 } from "uuid"
import bcrypt from 'bcrypt'

const app = express();

app.use(cors());
app.use(express.json());

const api_key = "";

const serverClient = StreamChat.getInstance(api_key, api_secret)

app.post("/signUp", async (req, res) => {

    try {

        const { firstName, lastName, username, password } = req.body

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10)
        const token = serverClient.createToken(userId);

        res.json({
            token,
            userId,
            firstName,
            lastName,
            username,
            hashedPassword
        })
    } catch (error) {
        res.json(error)
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body

    const { users } = await serverClient.queryUsers({ name: username })

    if (users.lengt === 0) {
        return res.json({ message: "User Not Found" })
    }

    const token = serverClient.createToken(userId);
    
    const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

    if (passwordMatch) {
        res.json({ token, firstName:})
    }
})

app.listen(3001, () => {
    console.log("Serverr is runing on port 3001")
})