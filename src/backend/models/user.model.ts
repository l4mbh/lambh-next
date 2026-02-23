import { db } from "@/backend/db"
import bcrypt from "bcryptjs"

export const UserModel = {
    findByEmail(email: string) {
        return db.user.findUnique({ where: { email } })
    },

    async verifyPassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword)
    },

    async create(data: { name: string; email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        return db.user.create({
            data: {
                name: data.name || data.email,
                email: data.email,
                password: hashedPassword,
            },
        })
    },
}
