import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showProfile = false;
  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    translate.use(environment.defaultLanguage);
  }

  ngOnInit(): void {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
