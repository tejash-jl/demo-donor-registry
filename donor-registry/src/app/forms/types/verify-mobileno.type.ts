import { Component, ElementRef, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralService, getDonorServiceHost } from '../../services/general/general.service';

@Component({
  selector: 'verify-mobileno',
  styleUrls: ['../forms.component.scss'],
  templateUrl: './verify-mobileno.type.html',
})
export class VerifyMobileNo extends FieldType {
  isVerify: boolean = false;
  number: string;
  transactionId: any;
  optVal: any;
  linkedAbhaList: any;
  isAllAbhaRegister: boolean = false;
  selectedProfile: any;
  dataObj: any;
  isNumberValid: boolean = true;
  errorMessage: any;
  customErrCode: string;
  err401: boolean = false;

  constructor(private http: HttpClient, public generalService: GeneralService, public router: Router,) {
    super();
  }

  ngOnInit(): void {
    localStorage.removeItem('form_value');
    if (localStorage.getItem('isVerified') === 'true') {
      this.isVerify = true;
    }
  }
  async verifyOtp(fieldKey) {

    this.number = (<HTMLInputElement>document.getElementById(fieldKey)).value;

    if (this.number && this.number.length == 10) {

      let dateSpan = document.getElementById('abhamessage');
      dateSpan.classList.remove('text-danger');
      dateSpan.innerText = "";
      document.getElementById('mobileno').classList.remove('is-invalid');

      let param = {
        mobile: this.number,
      };
      await this.http
        .post<any>(`${getDonorServiceHost()}/auth/mobile/sendOTP`, param)
        .subscribe({
          next: (data) => {
            this.transactionId = data.txnId;
            this.OtpPopup();
          },
          error: (error) => {
            console.log(error);
          }
        });
    } else {
      this.isNumberValid = false;
      let dateSpan = document.getElementById('abhamessage');
      dateSpan.classList.add('text-danger');
      dateSpan.innerText = "Please enter valid mobile number";
      document.getElementById('mobileno').classList.add('is-invalid');
    }
  }

  onItemChange(data) {
    this.selectedProfile = data;
  }

  checkErrType(err) {
    this.errorMessage = err?.error['message'];
    if (this.errorMessage.includes('30')) {
      this.customErrCode = '420';
    }
    if (this.errorMessage.includes('enter valid ABHA')) {
      this.customErrCode = '427';
    }
  }


  getProfile() {
    let param = {
      "healthId": this.selectedProfile.healthIdNumber,
      "transactionId": this.linkedAbhaList.txnId,
      "token": this.linkedAbhaList.token
    };

    this.http
      .post<any>(`${getDonorServiceHost()}/abha/profile`, param)
      .subscribe({
        next: (data) => {

          console.log(data);
          let dateSpan = document.getElementById('abhamessage');
          dateSpan.classList.remove('text-danger');
          dateSpan.innerText = "";
          document.getElementById('mobileno').classList.remove('is-invalid');
          (document.getElementById('mobileno') as any).disabled = true;

          this.dataObj = data;
          let dayOfBirth = data?.dayOfBirth;
          let monthOfBirth = data?.monthOfBirth;
          let yearOfBirth = data?.yearOfBirth;
          let dateFull = `${monthOfBirth}/${dayOfBirth}/${yearOfBirth}`;
          let dob = new Date(dateFull);
          let month_diff = Date.now() - dob.getTime();
          let age_dt = new Date(month_diff);
          let year = age_dt.getUTCFullYear();
          let age = Math.abs(year - 1970);

          if (age < 18) {

            this.isVerify = false;
          } else {

            const healthIdNumber = this.dataObj.healthIdNumber.replaceAll('-','');
            localStorage.setItem(healthIdNumber, JSON.stringify(this.dataObj));
            localStorage.setItem('form_value', JSON.stringify(this.dataObj));
            localStorage.setItem('isVerified', JSON.stringify(this.isVerify));
            setTimeout(() => {
               (document.getElementById('mobileno') as any).focus();
            }, 1000);
          }
        },
        error: (error) => {
          document.getElementById('closeModalButton').click();
          console.error('There was an error!', error);
        },
      });
  }


  submitOtp() {
    if (this.optVal) {
      let param = {
        transactionId: this.transactionId,
        otp: this.optVal,
      };

      localStorage.setItem('isAutoFill', 'true');

      this.http
        .post<any>(`${getDonorServiceHost()}/auth/mobile/verifyOTP`, param)
        .subscribe({
          next: (data) => {
            this.isVerify = true;
            this.closePops('verifyOtpPopup');
            this.linkedAbhaList = data;

            for (let i = 0; i < data['mobileLinkedHid'].length; i++) {
              if (!data['mobileLinkedHid'][i].pledged) {
                this.isAllAbhaRegister = true;
              }
            }

            this.selectProfile();

          },
          error: (error) => {

            console.error('There was an error!', error);
          },
        });
    }
  }

  OtpPopup(id = "verifyOtpPopup") {
    var button = document.createElement("button");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${id}`);
    document.body.appendChild(button)
    button.click();
    button.remove();
  }

  selectProfile(id = 'selectProfileModel') {
    var button = document.createElement("button");
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${id}`);
    document.body.appendChild(button)
    button.click();
    button.remove();
  }

  closePops(id) {
    let modal = document.getElementById(id);
    modal.style.display = 'none';
    modal.style.opacity = '0';
  }
}
