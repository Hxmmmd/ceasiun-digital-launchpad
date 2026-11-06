import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        database: {
            joins: true,
        },
    },
    emailAndPassword: { 
        enabled: true, 
    }, 
});

export default auth

