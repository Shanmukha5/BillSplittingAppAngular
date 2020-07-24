import { Component } from '@angular/core';

import { Group } from "./group";
import { Activity } from "./activity";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multi-device-programming-assignment-by-Shanmukha-Prakash';

  groupMemberName: string;

  activityCost: number;

  selectedMember: string;

  groupMembersList: string[];
  paymentList: number[];
  finalPaymentList: number[];
  totalAmount: number;
  amountPerHead: number;

  messages: string[];



  ngOnInit() {
    this.groupMembersList = [];
    this.groupMemberName = "";
    this.activityCost = 0;

    this.selectedMember = "";

    this.paymentList = [];
    this.finalPaymentList = [];
    this.totalAmount = 0;
    this.amountPerHead = 0;
    this.messages = [];
  }

  addMember() {
    if (this.groupMemberName !== "") {
      const newMember: string = this.groupMemberName;
      this.groupMembersList.push(newMember);
      this.paymentList.push(0);
      this.finalPaymentList.push(0);
    }
    this.groupMemberName = "";
  }

  activitySubmit() {
    if (this.selectedMember !== "") {
      var member = this.selectedMember;
      this.paymentList[this.groupMembersList.indexOf(this.selectedMember)] = this.paymentList[this.groupMembersList.indexOf(this.selectedMember)] + this.activityCost;

      this.totalAmount += this.activityCost;
      console.log("Total amount " + this.totalAmount);

      this.amountPerHead = this.totalAmount / this.paymentList.length;
      console.log("Amount Per Head " + this.amountPerHead);

      for (let i = 0; i < this.groupMembersList.length; i++) {
        this.finalPaymentList[i] = this.paymentList[i] - this.amountPerHead;
        console.log(this.groupMembersList[i] + " - " + this.finalPaymentList[i]);


      }

      console.log(this.finalPaymentList);


    }
  }

  getResult() {
    //console.log("inside getResult");

    for (let j = 0; j < (this.groupMembersList.length); j++) {
      let m = 0;
      if (this.finalPaymentList[j] > 0) {
        while (this.finalPaymentList[j] > 0 && m <= this.groupMembersList.length) {
          //console.log("M values " + m);
          if (this.finalPaymentList[m] < 0 && m != j) {
            let val = this.finalPaymentList[m] + this.finalPaymentList[j];
            if (val > 0) {
              this.messages.push(this.groupMembersList[m] + " owes " + this.groupMembersList[j] + " amt1: " + Math.abs(this.finalPaymentList[m] + (-2 * this.finalPaymentList[m])));

              this.finalPaymentList[j] = this.finalPaymentList[j] + this.finalPaymentList[m];
              this.finalPaymentList[m] = 0;
              m += 1;
            } else if (val < 0) {
              this.messages.push(this.groupMembersList[m] + " owes " + this.groupMembersList[j] + " amt2: " + Math.abs(this.finalPaymentList[m] - val))

              this.finalPaymentList[m] = this.finalPaymentList[m] + this.finalPaymentList[j];
              this.finalPaymentList[j] = 0;
              m += 1;
            } else {
              this.messages.push(this.groupMembersList[m] + " owes " + this.groupMembersList[j] + " amt3: " + Math.abs(this.finalPaymentList[m]));

              this.finalPaymentList[m] = 0;
              this.finalPaymentList[j] = 0;
              m += 1;
            }

          } else {
            m += 1;
          }
        }
      } else {
        m += 1;
      }
    }
    console.log(this.messages);
  }

}


