import { IOClients } from '@vtex/api'
import { Target } from './target'

export class Clients extends IOClients {

  public get target() {
    return this.getOrSet('target', Target)
  }

}
