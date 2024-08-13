export async function external(ctx: Context) {
    const { clients: { target } , vtex: { logger, route: { params }} } = ctx
    const { id } = params
    
    try {
        const attempt = await target.internal(typeof(id) === "string" ? id : id[0] )
        ctx.body = attempt
    } catch(e) { logger.error(e); throw new Error(`${e}`) }
    return
}