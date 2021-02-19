import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit, OnChanges {
  // passed parameters from parent components
  @Input() confirmationHeader = 'Confirmation';
  @Input() confirmationMessage = 'Are you sure you want to continue?';
  @Input() actionText = 'Continue';
  @Input() closeDialogOnsuccess = false;
  @ViewChild('closeButton')
  closeButton!: ElementRef;
  // output event to parent component to proceed further and close dialog box
  @Output() succesConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    translate.use(environment.defaultLanguage);
  }

  ngOnInit(): void {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.closeDialogOnsuccess.currentValue) {
      this.close();
    }
  }

  // close confirm dialog box
  close(): void {
    this.closeButton.nativeElement.click();
  }

  // send response to parent component that confirmation is accepted
  yesClick(): void {
    this.close();
    this.succesConfirmation.emit();
  }
}
