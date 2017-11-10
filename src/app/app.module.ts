import { APP_INITIALIZER, NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './templates/templates.module';
import { SharedModule } from './common/common.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import reducer from './common/reducers/index';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

export class SomeError implements ErrorHandler {
  handleError(error) {
    console.error('Error Handler: ', error);
  }
}

// Load Data from the server on app init
export function startDataService(_dataService: DataService): any {
  return () => {
      return _dataService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesModule,
    StoreModule.provideStore(reducer),
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: startDataService,
      deps: [DataService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: SomeError
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

