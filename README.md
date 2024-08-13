## Foreign Master Data Logs

Suppose you're a VTEX App vendor and would like to check some persisted data at a merchant's tenant. How can you retrieve such data back, since you probably do not have access to the merchant's environment?

This app showcase how you can securely expose a service in your own account that will proxy the MD search.

For instance, let's say I'm [vendor _VTEX_](./manifest.json#L3) and want to check some data another app of ours persisted at _merchant_'s MD.

I can [curl https://logs--vtex.myvtex.com/_v/vtex.logs-reader/v0/merchant/searchParam](./node/service.json#L20)

And as long as I have this app present:
- on account _vtex_, workspace _logs_
- on account _merchant_, [workspace _elsewhere_](./node/middlewares/load.ts#L6)

I'd be able to successfully query what I'm looking for.