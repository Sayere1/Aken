import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";



export const agentsRouter = createTRPCRouter({
    //todo: change getOne to use protectedProcedure
    getOne: protectedProcedure.input(z.object({ id: z.string()})).query(async ({input}) => {
        const [existingAgent] = await db
            .select({
                //TODO: chnage to actual count
                 meetingCount: sql<number>`5`,
                ...getTableColumns(agents),
            })
            .from(agents)
            .where(eq(agents.id, input.id))

        return existingAgent;
    }),

     //todo: change getMany to use protectedProcedure
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents);

        return data;
    }),

    create: protectedProcedure
        .input(agentInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input, userId: ctx.auth.user.id
                })
                .returning();

            return createdAgent;
        }),
});

