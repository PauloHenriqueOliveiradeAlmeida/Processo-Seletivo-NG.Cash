import { createContext, useState } from "react";
import Router from "next/router"
import { setCookie } from "nookies";

interface signIn {
    username: string,
    password: string
}


interface authContextType {
    signIn: (data: signIn) => Promise<void>
}


export const  AuthContext = createContext({} as authContextType);

export function AuthProvider(props: {children: JSX.Element}) {
    async function signIn({username, password}: signIn) {
        const req = await fetch("/api/users/searchUsers", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
              "Content-Type": "application/json"
            }
        });
        const res = await req.json();
        if (res.authenticated) {
            setCookie(undefined, "next_auth_token", res.token, {
    	        maxAge: 60 * 60 * 24,
                path: "/",
                HttpOnly: true
            });
            Router.push("/dashboard");
        }
        else {
			if (res.error === "password") {
				alert("Username ou senha incorretos, tente novamente");
			}
			else {
				alert("Usuário não encontrado");
			}
        }

    }
    return (
        <AuthContext.Provider value={{signIn}}>
            {props.children}
        </AuthContext.Provider>
    );
}