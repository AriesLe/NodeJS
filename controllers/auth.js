import { createError } from "../utils/error.js"
import { prisma } from "../utils/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Function to check token is valid or not
export const verifyToken = (req, res, next) => {
	const authorizationHeader = req.headers["authorization"]
	if (!authorizationHeader) return next(createError(401, "Invalid token!"))

	const token = authorizationHeader.split(" ")[1]
	if (!token) return next(createError(401, "Invalid token!"))

	jwt.verify(token, process.env.JWT_KEY, (err, data) => {
		if (err) return next(createError(403, "Unauthorized!"))
		next()
	})
}

export const register = async (req, res, next) => {
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
			return res.status(201).json({
				status: false,
				message: "User is already existed",
			})

		// 3/. Hash password user
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(req.body.password, salt)

		// 4/. Tạo user lên DB
		const newUser = { email, username, password: hash }
		const user = await prisma.user.create({ data: newUser })
		res.status(200).json({
			status: true,
			data: {
				user: newUser,
			},
		})
	} catch (err) {
		next(err)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password: _password } = req.body
		// 1/. Check xem có tồn tại email đã register hay chưa, nếu chưa thì trả lỗi
		const user = await prisma.user.findFirst({ where: { email } })
		if (!user) return next(createError(403, "Wrong authentication"))

		// 2/. Check xem password đã khớp vs email chưa, nếu chưa thì trả lỗi
		const isPasswordCorrect = await bcrypt.compare(_password, user.password)
		if (!isPasswordCorrect)
			return next(createError(403, "Wrong authentication"))

		// 3/. Khai báo accessToken, hạn truy cập
		const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
			expiresIn: process.env.JWT_EXPIRED,
		})

		// 4/. Lấy password và tách ra khỏi user
		const { password, ...others } = user

		// 5/. Gửi lại biến data user
		res.status(200).json({
			status: true,
			data: {
				user: { ...others, token },
			},
		})
	} catch (err) {
		next(err)
	}
}
