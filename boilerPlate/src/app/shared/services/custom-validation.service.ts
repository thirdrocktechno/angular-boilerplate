import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { password, phoneNumber } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor() {}

  passwordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control.value === '' || control.value === null) {
      return null;
    }

    if (control.value && control.value.match(new RegExp(password))) {
      return null;
    }
    return { passwordInvalid: true };
    // tslint:disable-next-line: semicolon
  };

  /**
   * Phone number validator
   * @param control in form control
   * Supports 10 digits only
   */
  phoneNumberValidator(control: FormControl): any {
    if (control.value === '' || control.value === null) {
      return null;
    }
    if (control.value.match(phoneNumber)) {
      return null;
    }
    return { invalidPhoneNumber: true };
  }

  checkIfMatchingPasswords: any = (
    passwordKey: string,
    passwordConfirmationKey: string
  ): ValidationErrors | null => (group: FormGroup) => {
    const passwordInput = group.controls[passwordKey];
    const passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({ notEquivalent: true });
    } else {
      return passwordConfirmationInput.setErrors(null);
    }
    // tslint:disable-next-line: semicolon
  };
}
