import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { globalReducers } from './store/reducers';
import { MaterialApisModule } from './shared/material-apis/material-apis.module';
import { SharedModule } from './shared/shared.module';
import { ProductsService } from './shared/services/products.service';
import { ProductsEffect } from './store/effects/products/products.effect';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CategoriesService } from './shared/services/categories.service';
import { CategoriesEffect } from './store/effects/categories/categories.effect';
// handles translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialApisModule,
    EffectsModule.forRoot([ProductsEffect, CategoriesEffect]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    StoreModule.forRoot(globalReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [ProductsService, CategoriesService],
  bootstrap: [AppComponent],
  exports: [
    TruncatePipe,
  ],
})
export class AppModule { }
