import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { ChatComponent } from './components/chat/chat.component';
import { AddKeyComponent } from './components/add-key/add-key.component';
import { AddLineComponent } from './components/add-line/add-line.component';
import { EditKeyComponent } from './components/edit-key/edit-key.component';
import { EditLineComponent } from './components/edit-line/edit-line.component';
import { CreatePDFComponent } from './components/create-pdf/create-pdf.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    EditImageComponent,
    ChatComponent,
    AddKeyComponent,
    AddLineComponent,
    EditKeyComponent,
    EditLineComponent,
    CreatePDFComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    routing,
    SwiperModule,
    InfiniteScrollModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    appRoutingProviders,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
