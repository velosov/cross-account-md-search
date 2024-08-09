
export async function internal(ctx: Context, next: () => Promise<any>) {
    const { clients: { masterdata }, vtex: { route: { params }} } = ctx
    console.log(params)
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
    await next
}