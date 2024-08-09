// Interface for any VTEX Store you've got to particularly trigger an update event
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { slug, version } from '../constants'

export class Target extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://app.io.vtex.com/${slug}/v${version[0]}/${context.settings.target.account}/${context.settings.target.workspace}/`, context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
        'X-VTEX-Use-Https': 'true',
      },
    })
  }

  public internal = async (id: string): Promise<any>  => {
    try {
      const resp = await this.http.get(`/_v/vtex.logs-reader/v0/internal/${id}`, {
        headers: { 'content-type': 'application/json', ...this.options?.headers },
      })
      this.context.logger.debug(`Successfully fetched data from target MD: ${resp}.`)
      return resp
    } catch(err) {
      this.context.logger.error({
        message: 'Error triggering update at account:',
        err,
      })
      throw new Error(JSON.stringify(err))
    }
  }
}