import { db } from "@/db";
import { transcribe } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";



export const transcribeRouter = createTRPCRouter({

    //todo: change getOne to use protectedProcedure
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingTranscribe] = await db
            .select({
                ...getTableColumns(transcribe),
            })
            .from(transcribe)
            .where(
                and(
                    eq(transcribe.id, input.id),
                    eq(transcribe.userId, ctx.auth.user.id),
                )
            );

            if (!existingTranscribe) {
                throw new TRPCError({code: "NOT_FOUND", message: "Meeting not found"});
            }

        return existingTranscribe;
    }),

    //todo: change getMany to use protectedProcedure
    getMany: protectedProcedure
        .input(
            z.object({
                page: z.number().default(DEFAULT_PAGE),
                pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
                search: z.string().nullish()
            })
        )
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize } = input;
            const data = await db
                .select({
                    ...getTableColumns(transcribe),
                })
                .from(transcribe)
                .where(
                    and(
                        eq(transcribe.userId, ctx.auth.user.id),
                        search ? ilike(transcribe.name, `%${search}%`) : undefined,
                    )
                )
                .orderBy(desc(transcribe.createdAt), desc(transcribe.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)

            const [total] = await db
                .select({ count: count() })
                .from(transcribe)
                .where(
                    and(
                        eq(transcribe.userId, ctx.auth.user.id),
                        search ? ilike(transcribe.name, `%${search}%`) : undefined,
                    )
                );

                const totalPages = Math.ceil(total.count / pageSize); 

            return {
                items: data,
                total: total.count,
                totalPages,
            }
        }),
});

