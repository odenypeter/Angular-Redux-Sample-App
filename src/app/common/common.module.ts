import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowLevel1Actions } from './actions/workflowLevel1.actions';
import { WorkflowLevel2Actions } from './actions/workflowLevel2.actions';
import { EffectsModule } from '@ngrx/effects';
import { WorkFlowLevel1Effects } from '../common/effects/workflowLevel1.effects';
import { WorkFlowLevel2Effects } from '../common/effects/workflowLevel2.effects';
import { QueuedActions } from './actions/queued.actions';
import { HttpModule } from '@angular/http';
import { RequestService } from 'app/common/services/request.service';


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
    RequestService,
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
