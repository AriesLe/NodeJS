import express from "express"
import { deleteUser, getUser, updateUser } from "../controllers/user.js"

const router = express.Router()

router.get("/user", getUser)
router.delete("/user", deleteUser)
router.put("/user", updateUser)

export default router
