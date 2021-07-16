import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IfPlatformIsDirective } from './directives/if-platform-is.directive';
import { MobileHttpInterceptor } from './http/http-mobile.interceptor';
import { Base64ToBytesPipe } from './pipes/base64-to-bytes.pipe';
import { BytesWithUnitPipe } from './pipes/bytes-with-unit.pipe';
import { MailToPipe } from './pipes/mail-to.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IfPlatformIsDirective,
    MailToPipe,
    Base64ToBytesPipe,
    BytesWithUnitPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MobileHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
