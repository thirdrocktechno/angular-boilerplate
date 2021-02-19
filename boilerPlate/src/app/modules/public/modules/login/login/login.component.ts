import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { get } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public get = get;
  public subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private loginService: LoginService
  ) {
    translate.setDefaultLang(environment.defaultLanguage);
    translate.use(environment.defaultLanguage);
  }

  ngOnInit(): void {
    // on component init create form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      let payload: Login = new Login();
      payload = this.loginForm.value;
      this.subscription.add(
        this.loginService.login(payload).subscribe((res) => {
          if (res) {
          }
        })
      );
      localStorage.setItem('auth-token', 'fdfd');
      this.router.navigate(['private/dashboard']);
      this.toastr.success('Logged in');
    } else {
      (Object as any)
        .values(this.loginForm.controls)
        .forEach((control: { markAsTouched: () => void }) => {
          control.markAsTouched();
        });
    }
  }
}
