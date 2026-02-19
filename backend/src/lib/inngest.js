import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.modal.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "ProctoHire" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },

    async ({ event }) => {
        console.log("Incoming Clerk Event:", event.data);
        await connectDB()

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses?.[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            profileImage: image_url
        };


        try {
            const user = await User.create(newUser);
            console.log("User saved:", user);

            await upsertStreamUser({
                id: newUser.clerkId.toString(),
                name: newUser.name,
                image: newUser.profileImage
            })
        } catch (err) {
            console.error("DB ERROR:", err);
            throw err;
        }
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },

    async ({ event }) => {
        await connectDB()

        const { id } = event.data
        try {
            await User.deleteOne({ clerkId: id })
            console.log("User deleted");

            await deleteStreamUser(id.toString());
        } catch (err) {
            console.error("Deletion failed : ", err);
            throw err;
        }
         
    }
)

export const functions = [syncUser, deleteUserFromDB]