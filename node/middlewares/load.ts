export async function load(ctx: Context, next: () => Promise<any>) {
    const { vtex: { route: { params }} } = ctx
    const { account, id } = params
    ctx.vtex.settings = { ...ctx.vtex.settings, target: { account, workspace: 'logs' }, id } //changing the context does not change an already instantiated client
    next
}