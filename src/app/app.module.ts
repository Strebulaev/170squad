import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MaksimushkaComponent } from './maksimushka/maksimushka.component';
import { VikushaComponent } from './vikusha/vikusha.component';
import { IlushaComponent } from './ilusha/ilusha.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SergeyComponent } from './sergey/sergey.component';
import { ArsushaComponent } from './arsusha/arsusha.component';
import { LoginComponent } from './login/login.component';
import { LoreComponent } from './lore/lore.component';
import { BronzeCopperComponent } from './bronze-copper/bronze-copper.component';
import { DndchessComponent } from './dndchess/dndchess.component';
import { DonatComponent } from './donat/donat.component';
import { FanartsComponent } from './fanarts/fanarts.component';
import { DubStepComponent } from './dub-step/dub-step.component';
import { CountdownComponent } from './countdown/countdown.component';
import { IisComponent } from './iis/iis.component';
//social network
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TelegramComponent } from './chat/telegram.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    IlushaComponent,
    ArsushaComponent,
    LoginComponent,
    VikushaComponent,
    MaksimushkaComponent,
    SergeyComponent,
    BronzeCopperComponent,
    CountdownComponent,
    DndchessComponent,
    IisComponent,
    DonatComponent,
    LoreComponent,
    TelegramComponent,
    //social network

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'ilusha', component: IlushaComponent },
      { path: 'arsusha', component: ArsushaComponent },
      { path: 'vikusha', component: VikushaComponent },
      { path: 'maksimushka', component: MaksimushkaComponent },
      { path: 'sergey', component: SergeyComponent },
      { path: 'lore', component: LoreComponent },
      { path: 'bronze-copper', component: BronzeCopperComponent },
      { path: 'dndchess', component: DndchessComponent },
      { path: 'donat', component: DonatComponent },
      { path: 'dub-step', component: DubStepComponent },
      { path: 'fanarts', component: FanartsComponent },
      { path: 'iis', component: IisComponent },
      { path: 'countdown', component: CountdownComponent },
      { path: 'chat', component: TelegramComponent },
      //social network
    ]),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
