
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  PLATFORM_Id = inject(PLATFORM_ID)

  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
  })


  submitForm() {
    // console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/"])

          if (isPlatformBrowser(this.PLATFORM_Id)) {
            localStorage.setItem("userToken", res.token)
            localStorage.setItem("userData",JSON.stringify(res.user))

          }

          this.authService.isUser.set(true)
          this.authService.decodeUserToken()

        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }

  }
}
