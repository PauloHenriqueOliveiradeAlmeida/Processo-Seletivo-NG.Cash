import { NextApiRequest, NextApiResponse } from "next";
import { registerUsersDB } from "../db/users";

export default async function registerUsers(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    const registerUser = await registerUsersDB(username, password);

    res.json({result: registerUser});
}