import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth-service';

@Component({
  selector: 'app-forget-password-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css',
})
export class ForgetPasswordComponent {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  steps = signal<number>(1)

  forgetPasswordForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  })

  verifyCodeForm: FormGroup = this.fb.group({
    resetCode: ["", [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  })

  resetPasswordForm: FormGroup = this.fb.group({
    newPassword: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
  })


  submitForgetPassword() {
    if (this.forgetPasswordForm.valid) {
      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg == "success") {
            this.steps.set(2);
          }
          // nadaelghnam141@gmail.com
        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.forgetPasswordForm.markAllAsTouched()
    }

  }

  submitVerifyCode() {
    if (this.verifyCodeForm.valid) {
      this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == "Success") {
            this.steps.set(3);
          }

        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.verifyCodeForm.markAllAsTouched()
    }

  }

  submitResetCode() {
    let body ={
      email:this.forgetPasswordForm.get("email")?.value,
      newPassword:this.resetPasswordForm.get("newPassword")?.value
    }
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(body).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/login"])

        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.resetPasswordForm.markAllAsTouched()
    }

  }
}

