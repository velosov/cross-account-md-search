export async function external(ctx: Context) {
    const { clients: { target } , vtex: { route: { params }} } = ctx
    const { account, id } = params
    console.log(account, id)
    ctx.vtex.settings = { ...ctx.vtex.settings, target: { account, workspace: 'logs' } } //changing the context does not change an already instantiated client
    try {
        console.log(ctx.vtex.settings)
        const attempt = await target.internal(typeof(id) === "string" ? id : id[0] )
        console.log(ctx.vtex.settings)
        ctx.body = attempt
    } catch(e) { console.log(e) }
    return
}