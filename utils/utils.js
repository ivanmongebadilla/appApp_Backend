import bcrypt from "bcrypt";

export async function hashPassword(password) {
    const saltRounds = 12;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password");
    }
}

export const correctPassword = async (candidatePassword, userPassword) => {
    try {
        return await bcrypt.compare(String(candidatePassword), String(userPassword))
    } catch (error) {
        console.error("Error comparing passwords", error)
        throw new Error("Failed to compare passwords")
    }
}