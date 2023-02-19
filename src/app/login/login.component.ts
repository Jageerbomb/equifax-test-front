import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(
      `Usuario: ${this.loginForm.value.username}, Contraseña: ${this.loginForm.value.password}`
    );
    this.loginService.getData(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (res) => {
          console.log(res);
          this.toastShow('success', 'Haz sido loggeado con exito!');
        },
        (error) => {
          console.log(error)
          if(error.status == 401) {
            this.toastShow('error', error.error.error);
          }
        }
      );
    //this.toastShow();
  }

  toastShow(icon: any, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: message,
    });
  }
}
