import express from "express"
import dotenv from "dotenv"
import compression from "compression"
import cors from "cors"
import bodyParser from "body-parser"

import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"

dotenv.config()

const app = express()

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

//route users
app.use("/api/v1/user", userRoute)

//route authentication
app.use("/api/v1/auth", authRoute)

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500
	const errorMessage = err.message || "Something went wrong!"
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})

const PORT = process.env.PORT || 2003

app.listen(PORT, () => {
	console.log(`Server is running with`)
})
