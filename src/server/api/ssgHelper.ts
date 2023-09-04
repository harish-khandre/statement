import { createServerSideHelpers } from "@trpc/react-query/server"
import { appRouter } from "./root";
import { createTRPCContext } from './trpc'
import SuperJSON from "superjson";


export function ssgHelper() {



    return createServerSideHelpers({
        router: appRouter,
        
        ctx: createTRPCContext({session: null, revalidateSSG: null}),
        transformer: SuperJSON,
    });
}