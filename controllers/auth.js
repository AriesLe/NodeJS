import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const register = async (req, res) => {
	try {
		// 1/. Check user is exist or not
		const { email, username } = req.body
		const isUserExisted = await prisma.user.findFirst({
			where: {
				email,
			},
		})

		// 2/. If exist, báo lỗi đã tồn tại
		if (isUserExisted)
			return res.status(200).json({
				status: false,
				message: "User is already existed",
			})

		// 3/. Tạo user lên DB
		const user = await prisma.user.create({ data: { email, username } })
		res.status(201).json({
			status: true,
			data: {
				user,
			},
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Error",
			error: err,
		})
	}
}

export const login = () => {}
