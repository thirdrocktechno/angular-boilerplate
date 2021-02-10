import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCaseDirective } from './directives/title-case.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [TitleCaseDirective, HeaderComponent, FooterComponent, SidebarComponent, ConfirmDialogComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
