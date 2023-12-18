import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"

dotenv.config()

const app = express()
app.use(express.json())

//route users
app.use("/api/v1", userRoute)

//route authentication
app.use("/api/v1", authRoute)

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
