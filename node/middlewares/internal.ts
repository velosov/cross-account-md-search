import { UserInputError } from "@vtex/api";

export async function internal(ctx: Context, next: () => Promise<any>) {
    const { clients: { masterdata }, vtex: { logger } } = ctx

    try {
        // Change for your own query; this example ain't supposed to work since you probably don't have such mocked records
        const resp = await masterdata.searchDocuments({
            dataEntity: "Logs",
            fields: ["any"],
            pagination: {
                pageSize: 10,
                page: 1
            },
            where: `criteria=${"TID?"}`
        })
        ctx.status = 200
        ctx.body = resp
    } catch(e) { logger.error(e); throw new UserInputError(`Invalid MD Search: ${e}`) }
    await next()
}