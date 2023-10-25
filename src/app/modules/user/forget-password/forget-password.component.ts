import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgetForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (!this.forgetForm.valid) return;
    console.log(this.forgetForm.value.username);
    this.router.navigate(['/login']);
  }
}
