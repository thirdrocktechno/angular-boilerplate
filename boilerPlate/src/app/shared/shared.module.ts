import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCaseDirective } from './directives/title-case.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientApiService } from './http/http-client-api.service';
import { HttpResponseHandlerService } from './http/http-response-handler-service';

@NgModule({
  declarations: [
    TitleCaseDirective,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClientApiService, HttpResponseHandlerService],

  exports: [
    SidebarComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    TitleCaseDirective,
    FooterComponent,
  ],
})
export class SharedModule {}
