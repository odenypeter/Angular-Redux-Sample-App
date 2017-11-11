import { ListedActions } from '../actions/actionList.actions';
import { Observable } from 'rxjs/Observable';
import { ActionsService } from '../services/actions.service';

export class MainEffects {

  constructor(
    protected actions,
    protected _actionsService: ActionsService,
    ) {}
}
