"use client"

import { useTRPC } from "@/trpc/client";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField,
    FormItem, FormControl,
    FormLabel, FormMessage,
    FormDescription
 } from "@/components/ui/form";



import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";




interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
};

export const MeetingForm = ({onSuccess, onCancel, initialValues}: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [ agentSearch, setAgentSearch ] = useState("");
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,

        })
    )

    const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
        onSuccess: async (data) => {
           await queryClient.invalidateQueries(
                trpc.meetings.getMany.queryOptions({}),
            );

            //TODO: invalidate free tier usage
            onSuccess?.(data.id);
        },
        onError: (error) => {
            toast.error(error.message);

            //TODO: check if error code is "FORBBIDEN", redirect to "/upgrade"
        },
    }),
);

    const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
        onSuccess: async () => {
           await queryClient.invalidateQueries(
                trpc.meetings.getMany.queryOptions({}),
            );

            if (initialValues?.id) {
               await queryClient.invalidateQueries(
                    trpc.meetings.getOne.queryOptions({id: initialValues.id}),
                )
            }
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message);

            //TODO: check if error code is "FORBBIDEN", redirect to "/upgrade"
        },
    }),
);


const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
        name: initialValues?.name ?? "",
        agentId: initialValues?.agentId ?? "",
    },
});

const isEdit = !!initialValues?.id;
const isPending = createMeeting.isPending || updateMeeting.isPending;

const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
        updateMeeting.mutate({...values, id: initialValues.id})
    } else {
        createMeeting.mutate(values);
    }
};


return (
    <>
    <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField name="name" control={form.control}
        render={({field}) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} placeholder="e.g Interview consultation" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>

                    <FormField name="agentId" control={form.control}
        render={({field}) => (
            <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                    <CommandSelect options={(agents.data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                            <div className="gap-x-2 flex items-center">
                                <GeneratedAvatar seed={agent.name} variant="botttsNeutral" 
                                className="border size-6" />
                                <span>{agent.name}</span>
                            </div>
                        )
                    }))} 
                    onSelect={field.onChange}
                    OnSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an Agent"
                    />
                </FormControl>
                <FormDescription>
                    Not Found what you&apos;re looking for?{" "}
                    <Button type="button" onClick={() => setOpenNewAgentDialog(true)}
                        className="hover:text-primary underline">
                        Create new Agent
                    </Button>
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}/>

        <div className="justify-between gap-x-2 flex">
            {onCancel && (
                <Button variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}>
                    Cancel
                </Button>
            )}

            <Button disabled={isPending} type="submit">
                {isEdit ? "Update" : "Create"}
            </Button>
        </div>

        </form>

    </Form>

    </>
);

};

