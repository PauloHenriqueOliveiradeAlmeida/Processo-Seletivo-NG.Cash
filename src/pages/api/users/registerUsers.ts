import { NextApiRequest, NextApiResponse } from "next";
import { registerUsersDB } from "../db/users";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function registerUsers(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const registerUser = await registerUsersDB(username, hashedPassword);

    const token = sign({id: registerUser.id}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
    })

    res.json({token});
}