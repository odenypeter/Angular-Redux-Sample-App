export interface ActionState {
  type: string,
  payload: any,
  meta: {
    effect?: {
      method: string,
      url: string,
      payload?: any,
    },
    commit: any,
    rollback: any,
  }
}
