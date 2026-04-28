import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth-service';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  registerForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    rePassword: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    phone: ["", [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)]]
  })


  submitForm() {
    // console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/login"])
        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.registerForm.markAllAsTouched()
    }

  }
}
