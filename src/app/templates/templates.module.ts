import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common/common.module';
import { Workflowlevel1Component } from './workflowlevel1/workflowlevel1.component';
import { Workflowlevel2Component } from './workflowlevel2/workflowlevel2.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
],
  declarations: [
    Workflowlevel1Component,
    Workflowlevel2Component
  ],
  providers: [
  ],
  exports: [
    Workflowlevel1Component,
    Workflowlevel2Component
  ]
})
export class PagesModule {}
