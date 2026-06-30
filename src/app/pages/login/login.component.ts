import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { users } from '../helpers/data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public settings: any;

  passwordType: string = 'password';
  passwordShown: boolean = true;
  alertService: any;
  data: any[] = users;

  constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  public togglePassword() {
    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
  }

  // public onSubmit(values) {

  //   console.log(values)
  //   if (this.form.valid) {
  //     for (let i = 0; i < this.data.length; i++) {
  //       if (values.email === 'admin@optionmatrix.com' &&
  //         values.password === 'admin@123') {
  //         let userToken = btoa(encodeURIComponent(this.data[i]['email']))
  //         console.log((this.data[i].userId))
  //         localStorage.setItem('userToken', userToken)
  //         localStorage.setItem('userId', JSON.stringify(this.data[i].userId))
  //         if (this.data[i]['isClient']) {
  //           localStorage.setItem('isClient', JSON.stringify(true))
  //           this.router.navigate(['/app/client-login']);
  //         }
  //         else {
  //           localStorage.setItem('isClient', JSON.stringify(false))
  //           this.router.navigate(['/app']);
  //         }


  //         return;
  //       }
  //     }
  //     alert("Wrong E-mail Id or Password");
  //     //True if all the fields are filled
  //   }
  // }


  public onSubmit(values) {
    console.log(values);
    if (this.form.valid) {
      
      // 1. Supplier Hardcoded Login Check
      if (values.email === 'supplier@optionmatrix.com' && values.password === 'supplier@123') {
        let userToken = btoa(encodeURIComponent(values.email));
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userType', 'supplier'); // Set flag for supplier
        localStorage.setItem('isClient', JSON.stringify(false));
        
        // Route to supplier specific dashboard ncdksnk
         this.router.navigate(['/app']);
        return;
      }

      // 2. Admin Hardcoded Login Check
      if (values.email === 'admin@optionmatrix.com' && values.password === 'admin@123') {
        let userToken = btoa(encodeURIComponent(values.email));
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userType', 'admin'); // Set flag for admin
        localStorage.setItem('isClient', JSON.stringify(false));
        
        this.router.navigate(['/app']);
        return;
      }

      // 3. Dynamic User Data Loop (for Clients or other users in data array)
      for (let i = 0; i < this.data.length; i++) {
        if (values.email === this.data[i].email && values.password === this.data[i].password) {
          let userToken = btoa(encodeURIComponent(this.data[i]['email']));
          localStorage.setItem('userToken', userToken);
          localStorage.setItem('userId', JSON.stringify(this.data[i].userId));
          
          if (this.data[i]['isClient']) {
            localStorage.setItem('userType', 'client');
            localStorage.setItem('isClient', JSON.stringify(true));
            this.router.navigate(['/app/client-login']);
          } else {
            localStorage.setItem('userType', 'standard');
            localStorage.setItem('isClient', JSON.stringify(false));
            this.router.navigate(['/app']);
          }
          return;
        }
      }

      // If no conditions are met
      alert("Wrong E-mail Id or Password");
    }
  }

  openRegistrationDialog() {
    this.dialog.open(LoginComponent, {
      height: 'auto',
      width: '600px'
    });
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
    localStorage.setItem('userType', '');
  }
}
