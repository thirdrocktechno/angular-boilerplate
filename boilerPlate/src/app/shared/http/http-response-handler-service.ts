import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseHandlerService {
  constructor(private router: Router, private toastr: ToastrService) {}

  public onCatch(response: any): Observable<any> {
    switch (response.status) {
      case 400:
        // The server did not understand the request. -> Here it is when user can not delete admin
        this.handleUserCanNotDeleteAdminUser(response);
        break;

      case 404:
        this.handle404();
        break;

      case 401:
        // The requested page needs a username and a password.
        this.handleUnauthorized();
        break;

      case 403:
        // Access is forbidden to the requested page.
        this.handleForbidden();
        break;

      case 409:
        // handle already exists error
        this.handleAlreadyExists(response);
        break;

      case 415:
        // If server responses with invalid content type code.
        break;

      case 500:
        // The request was not completed. The server met an unexpected condition.
        break;

      case 422:
        // Any validation error from server
        this.handleUnprocessableEntity(response);
        break;

      default:
        break;
    }
    return response;
  }

  private handle404(): void {
    this.router.navigate(['/404']);
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to access denied page
   *
   */
  private handleUnauthorized(): void {
    if (localStorage.getItem('auth-token')) {
      this.toastr.error('User is not authorized');
      localStorage.clear();
      this.router.navigate(['/logout']);
    } else {
      this.toastr.error('Incorrect email or password');
    }
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(): void {}

  /**
   * shows error when API returns error code 409 and that is for already exists error
   */
  private handleAlreadyExists(response: {
    error: { message: string | undefined };
  }): void {
    this.toastr.error(response.error.message);
  }

  /**
   * Shows notification errors when server response status is 422
   */
  private handleUnprocessableEntity(response: {
    error: { message: string | undefined };
  }): void {
    this.toastr.error(response.error.message);
  }

  // tslint:disable-next-line: max-line-length
  private handleUserCanNotDeleteAdminUser(response: {
    error: {
      data: { failedPaymentActionValue: any };
      message: string | undefined;
    };
  }): void {
    if (response.error.data && !response.error.data.failedPaymentActionValue) {
      // added condition to not show error when error is from service page view
      this.toastr.error(response.error.message);
    }
  }
}
