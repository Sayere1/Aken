
import { meetingsRouter } from '@/modules/meetings/server/procedures';
import { createTRPCRouter } from '../init';
import { agentsRouter } from '@/modules/agents/server/procedures';
import { transcribeRouter } from '@/modules/transcribe/server/procedures';
import { premiumRouter } from '@/modules/premium/server/procedures';



export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  transcribe: transcribeRouter,
  premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;