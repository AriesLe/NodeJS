import { prisma } from "../utils/prisma.js"

export const getUsers = async (req, res) => {
	try {
		const user = await prisma.user.findMany()
		res.status(201).send(user)
	} catch (err) {
		res.status(500).json({
			message: "error",
			error: err,
		})
	}
}
