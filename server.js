import userRoute from "./routes/user.js"
import express from "express"

const app = express()
app.use('/api/v1', userRoute)
app.listen(8081, () => {
	console.log(`Server is running with`)
})
