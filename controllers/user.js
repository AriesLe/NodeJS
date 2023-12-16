import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUser = async (req, res) => {
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

export const getUsers = () => {}
export const deleteUser = () => {}
export const updateUser = () => {}
