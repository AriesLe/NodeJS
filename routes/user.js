import express from "express"
import { getUser, getUsers } from "../controllers/user.js"
import { verifyToken } from "../controllers/auth.js"

const router = express.Router()

// Run verifyToken first to check token is valid or not
router.get("/", verifyToken, getUsers)
router.get("/:id", verifyToken, getUser)

export default router
