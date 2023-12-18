import express from "express"
import { getUsers } from "../controllers/user.js"
import { verifyToken } from "../controllers/auth.js"

const router = express.Router()

// Run verifyToken first to check token is valid or not
router.get("/user", verifyToken, getUsers)

export default router
