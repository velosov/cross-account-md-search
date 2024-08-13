// It's necessary to set such context before initializing Target client

export async function load(ctx: Context, next: () => Promise<any>) {
    const { vtex: { route: { params }} } = ctx
    const { account, id } = params
    ctx.vtex.settings = { ...ctx.vtex.settings, target: { account, workspace: 'elsewhere' }, id }
    await next()
}