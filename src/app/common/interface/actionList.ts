export interface ActionList {
  type: string,
  payload: any,
  meta: {
    effect?: {
      method: string,
      url: string,
      payload?: any,
    },
    save: any,
    undo: any,
  }
}
