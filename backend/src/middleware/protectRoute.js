/*
   Currently, any user can access our routes to use any services on our website
   but we only want the authenticated user to do so...
*/

import { requireAuth } from "@clerk/express";
import User from "../models/User.modal.js";

export const protectRoute = [
    // If user is not authenticated redirects him to sign-in page.
    // requireAuth({ signInUrl: "/sign-in" }),

    // By default un-authenticated users are redirected to home page.
    requireAuth(),
    async (req, res, next) => {
        try {
           const clerkId = req.auth().userId;
           if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

           // find user in db by clerk ID
           const user = await User.findOne({ clerkId });
           if (!user) return res.status(404).json({ message: "User not found" });

           // attach user to req
           req.user = user;

           next();
        } catch (error) {
            console.error("Error in protectRoute middleware", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
]