import { createError } from "../utils/error.js"
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

export const getUser = async (req, res, next) => {
	const { id } = req.params
	try {
		const user = await prisma.user.findFirst({ where: { id } })
		if (!user) return next(createError(404, "User not found!"))
		const { password, ...others } = user
		res.status(201).json({
			success: true,
			data: {
				user: others,
			},
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "error",
			error: err,
		})
	}
}
