import { NextApiRequest, NextApiResponse } from "next";
import { registerUsersDB } from "../db/users";
import bcrypt from "bcrypt";

export default async function registerUsers(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const registerUser = await registerUsersDB(username, hashedPassword);

    res.json({result: registerUser});
}