import { NextApiRequest, NextApiResponse } from "next";
import { searchUsersDB } from "../db/users";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function searchUsers(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    const searchUser = await searchUsersDB(username);

    if (searchUser.length > 0) {
        const verifyPassword = bcrypt.compareSync(password, searchUser[0].password);

        if (verifyPassword) {
            return res.json({authenticated: verifyPassword, token: sign({id: searchUser[0].id}, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })});
        }
        else {
            return res.json({authenticated: verifyPassword, error: "password"});
        }
    }
    return res.json({authenticated: false, error: "not found"});
    
}