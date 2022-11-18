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
            return res.json({autenticated: verifyPassword, token: sign({id: searchUser[0].id}, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })});
        }
        else {
            return res.json({autenticated: verifyPassword, error: "password"});
        }
    }
    return res.json({autenticated: false, error: "not found"});
    
}