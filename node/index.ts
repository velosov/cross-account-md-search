import type {
    ParamsContext,
    ServiceContext,
    RecorderState,
  } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { internal, external } from './middlewares'

const seg =  1000 //ms
declare global {
    type Context = ServiceContext<Clients, State>

    interface State extends RecorderState {
        code: number
    }
}

export default new Service<Clients, State, ParamsContext>({
    clients: {
      implementation: Clients,
      options: {
        default: {
          retries: 2,
          timeout: 180 * seg,
        },
        events: {
          retries: 1,
          timeout: 60 * seg,
          concurrency: 10,
        },
      },
    },
    routes: {
      internal: method({
        GET: [internal],
      }),
      external: method({
        GET: [external],
      }),
    },
  })
  