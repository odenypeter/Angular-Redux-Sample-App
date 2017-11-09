import { QueuedActions } from '../actions/queued.actions';
import { Observable } from 'rxjs/Observable';
import { QueueService } from '../services/queue.service';

export class BaseEffects {

  constructor(protected actions, protected queueService: QueueService) {
  }
}
