import express from "express"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"

const app = express()
app.use(express.json())

//route users
app.use("/api/v1", userRoute)

//route authentication
app.use("/api/v1", authRoute)

app.listen(8081, () => {
	console.log(`Server is running with`)
})
