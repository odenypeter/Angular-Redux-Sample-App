import { APP_INITIALIZER, NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './templates/templates.module';
import { SharedModule } from './common/common.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import reducer from './common/reducers/index';
import { Http } from '@angular/http';
import { AppLoaderService } from './app-loader.service';
import { Observable } from 'rxjs/Observable';

// // AoT requires an exported function for factories
// export function HttpLoaderFactory(http: Http) {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '-lang.json');
// }

// Start loading all data from server
export function initAppLoadingService(appLoaderService: AppLoaderService): any {
  return () => {
      return appLoaderService.init();
  }
}

export class TolaErrorHandler implements ErrorHandler {
  handleError(error) {
    console.error('Tola Error Handler: ', error);
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
    AppLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppLoadingService,
      deps: [AppLoaderService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: TolaErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

