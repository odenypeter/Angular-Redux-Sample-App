import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowLevel1Service } from './services/workflowlevel1.service';
import { WorkflowLevel2Service } from './services/workflowlevel2.service';
import { WorkflowLevel1Actions } from './actions/workflowLevel1.actions';
import { WorkflowLevel2Actions } from './actions/workflowLevel2.actions';
import { EffectsModule } from '@ngrx/effects';
import { WorkFlowLevel1Effects } from '../common/effects/workflowLevel1.effects';
import { WorkFlowLevel2Effects } from '../common/effects/workflowLevel2.effects';
import { LoadingService } from './services/loading.service';
import { QueuedActions } from './actions/queued.actions';
import { QueueEffects } from './effects/queue';
import { QueueService} from './services/queue.service';
import { HttpModule } from '@angular/http';
import { NetworkService } from 'app/common/services/network.service';
import { ObjectHelper } from 'app/common/object.helper';
import { RequestService } from 'app/common/services/request.service';

export function initQueueService(queueService: QueueService): any {
  return () => {
    return queueService.load();
  }
}
// TODO: Move it to shared folder
const appEffectsRun = [
  EffectsModule.run(WorkFlowLevel1Effects),
  EffectsModule.run(WorkFlowLevel2Effects),
  ];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule,
    appEffectsRun
  ],
  providers: [
    QueuedActions,
    WorkflowLevel1Actions,
    WorkflowLevel2Actions,
    WorkflowLevel1Service,
    WorkflowLevel2Service,
    QueueService,
    LoadingService,
    NetworkService,
    ObjectHelper,
    RequestService,
    {
      provide: APP_INITIALIZER,
      useFactory: initQueueService,
      deps: [QueueService],
      multi: true
    },
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EffectsModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class SharedModule {
}
