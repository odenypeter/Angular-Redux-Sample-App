import {Action} from '@ngrx/store';
import {ListedActions} from '../actions/actionList.actions';

export function ListedActionsReducer(state = [], action: Action) {
    switch (action.type) {

        case ListedActions.SAVE_ACTION:
            return state.push(action.payload);

        case ListedActions.GET_ACTION_COMMIT:
            return state.push(action.payload);

        case ListedActions.DELETE_ACTION:
            const stateDeleted = []
            try {
              for (const item of state) {
                stateDeleted.push(item)
              }
              return stateDeleted;
            } catch (error) {
              return stateDeleted;
            }
        case ListedActions.DELETE_ACTION_COMMIT:
            const deletions = []
            try {
              for (const act of action.payload) {
                for (const st of state) {
                  if (st.id === act.localId) {
                    deletions.push(st)
                  }
                }
              }
              return deletions;
            }catch (error) {
              return deletions;
            }

        default:
            return state;
    }
}
