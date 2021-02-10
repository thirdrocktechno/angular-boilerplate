import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCaseDirective } from './directives/title-case.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [TitleCaseDirective, HeaderComponent, FooterComponent, SidebarComponent, ConfirmDialogComponent, NotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
