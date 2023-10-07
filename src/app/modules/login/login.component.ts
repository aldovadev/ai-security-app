import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/auth';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { RoleService } from 'src/app/shared/service/auth/role.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  remember: boolean = false;
  returnUrl: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userRole: RoleService,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      remember: false,
    });
  }

  ngOnInit() {
    this.isLogin();
    // console.log(this.returnUrl);
  }

  isLogin(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.route.queryParams.subscribe((queryParams) => {
      this.returnUrl = queryParams['returnUrl'] || '/login';
    });
    this.router.navigate([this.returnUrl]);
  }

  submit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    const payload: Login = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    console.log('login lai');

    this.authService.login(payload).subscribe(
      (r) => {
        console.log('login bisa gan');
        this.notification.showNotification('check', '#52c41a', 'Login Success');
        this.returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        console.log(this.returnUrl);
        this.router.navigate([this.returnUrl]);
        localStorage.setItem('token', r.accesToken);
      },
      (error) => {
        console.error(error);
        this.notification.showNotification('warning', '#eb2f96', 'Auth error');
      }
    );
  }
}
