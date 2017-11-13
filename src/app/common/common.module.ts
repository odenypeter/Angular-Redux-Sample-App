import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowLevel1Actions } from './actions/workflowLevel1.actions';
import { WorkflowLevel2Actions } from './actions/workflowLevel2.actions';
import { ListedActions } from './actions/actionList.actions';
import { EffectsModule } from '@ngrx/effects';
import { WorkFlowLevel1Effects } from '../common/effects/workflowLevel1.effects';
import { WorkFlowLevel2Effects } from '../common/effects/workflowLevel2.effects';
import { ActionListEffects } from '../common/effects/actionList.effects';
import { HttpModule } from '@angular/http';
import { RequestService } from './services/request.service';
import { ActionsService } from './services/actions.service';
import { LocalStorageService } from './services/localstorage.service';
import { AppService } from './services/app.service';

export function initializeActionService(_actionService: ActionsService): any {
    return () => {
      return _actionService.load();
    }
}

const appEffectsRun = [
  EffectsModule.run(WorkFlowLevel1Effects),
  EffectsModule.run(WorkFlowLevel2Effects),
  EffectsModule.run(ActionListEffects),
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
    ListedActions,
    WorkflowLevel1Actions,
    WorkflowLevel2Actions,
    RequestService,
    ActionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeActionService,
      deps: [ActionsService],
      multi: true
    },
    LocalStorageService,
    AppService
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
