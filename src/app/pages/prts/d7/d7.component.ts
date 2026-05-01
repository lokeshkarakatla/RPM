import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartsData } from '../PartsData';
import { AddActionGridMeetComponent } from '../action-grid-calender/action-grid-meet/add-action-grid-meet/add-action-grid-meet.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCuaseComponent } from '../add-cuase/add-cuase.component';
import { FormGroup, Validators, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActionDocumentTwoDialogComponent } from '../action-prts/action-document-two/action-document-two-dialog/action-document-two-dialog.component';
import { ActionDocumentTwoTypeComponent } from '../action-prts/action-document-two/action-document-two-type/action-document-two-type.component';
import { LogauditresultComponent } from '../logauditresult/logauditresult.component';
import { NoteComponent } from '../note/note.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddCapaComponent } from '../../capa/add-capa/add-capa.component';
@Component({
  selector: 'app-d7',
  templateUrl: './d7.component.html',
  styleUrls: ['./d7.component.scss']
})
export class D7Component implements OnInit {
  data: any;
   addLookupGroup: FormGroup;
   editLookupGroup: FormGroup;
   lookup: any = false;
   codes: any = [];
   colors: Array<any> = [{ 'code': 'green', 'name': 'Green', 'colorClass': 'dot_green' }, { 'code': 'blue', 'name': 'Blue', 'colorClass': 'dot_blue' }, { 'code': 'grey', 'name': 'Grey', 'colorClass': 'dot_grey' }, { 'code': 'red', 'name': 'Red', 'colorClass': 'dot_red' }];
   pageGroup: FormGroup;
   deleteLookupItemValue: any;
   index: any;
   private _lookupService: any;
   alertService: any;



   checked = false;

   // constructor(public router: Router, public dialog: MatDialog,) {
   //   this.addLookupGroup = this.fb.group({
   //     CodeMasterId: new FormControl(''),
   //     lookupNameDetails: this.fb.array([
   //       this.initTechnologyFields()
   //     ])
   //   });
   //  }

     constructor(
     //public dialogRef: MatDialogRef<AddValidationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
     public fb: FormBuilder, public router: Router,public dialog: MatDialog) {
    // console.log(data);
     this.addLookupGroup = this.fb.group({
       CodeMasterId: new FormControl(''),
       lookupNameDetails: this.fb.array([
         this.initTechnologyFields()
       ])
     });
     // this.editLookupGroup = this.fb.group({
     //   LookupId: new FormControl(''),
     //   CodeMasterId: new FormControl(''),
     //   LookupName: new FormControl(null, Validators.compose([Validators.required]))
     // });
   }

   totalSize: number = 0;
   ngOnInit(): void {
     // if (environment.mode == 1) {
     //   this.values = PartsData.getd1();
     // }
     // else {

     // }
     //   if (environment.mode == 1) {
     //   this.values = PartsData.fish();
     // }
     // else {

     // }

     this.totalSize = this.values.length;
    this.data = this.dataList;

  this.addNewInputField(5);


   }
 values = [
  { check:  '1. Are the correct tools/fixtures being used?' },
   { check: '2. Are the tools set to the specified torque?' },
   { check: '3. Are the tools properly calibrated? Last calibration date__________' },
   { check: '4. Are any bits or sockets worn or not in proper working condition?' },
   { check: '5. This is the correct length of air hose with no extra sections added?' },
   { check: '6. Are the tools rails, controllers, flow regulator connections correct?' },
   { check: '7. Is the tool connected to the ANDON System properly?' },
   { check: '8. If Error proofing is present, is it working correctly?' },
   { check: '9. Does the workplace layout allow the Operator to work efficiently?' }
 ];
 valuess=[
   {possible: 'Is the current Data/analysis data available?',short:'current Data'   },
   {possible: 'Is the current Data/analysis data available?',short:'current Data'   },
   {possible: 'Is the current Data/analysis data available?',short:'current Data'   },
   {possible: 'Is the current Data/analysis data available?',short:'current Data'   },
 ];
 valuesss=[
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 valuesh=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 valueshs=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 valu=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 val=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 v=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
 va=[
  {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 {issue:'Correct part numbers?'},
 ]
         deleteConfirmation(item: any) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: { ProjectId: item.ProjectId, title: 'Delete Confirmation', content: 'Are you sure you want to Delete?' }
    });

}
check_box_type = {
  APPLY_FOR_JOB: 'APPLY_FOR_JOB',
  MODIFY_A_JOB: 'MODIFY_A_JOB'
};
   next() {
     this.router.navigate(['/app/prtsnavbar/closure']);
   }
   back() {
     this.router.navigate(['/app/prtsnavbar/d6']);
   }
   action() {
     this.router.navigate(['/app/prtsnavbar/why-two']);
   }
   addchecklistaudit() {
     let dialogRef = this.dialog.open(AddCuaseComponent, {

       height: 'auto',
       width: '600px'
     });
     dialogRef.afterClosed().subscribe(data => {
     });

   }
   addMeeting(item) {
     this.dialog.open(AddCapaComponent, {
       data: item,
       width: "850px",
       height: "auto"
     })
   }


   activeTab: string = 'overview';

   setTab(tab: string) {
     this.activeTab = tab;
   }

 //  data: any;
 //   addLookupGroup: FormGroup;
 //   editLookupGroup: FormGroup;
 //   lookup: any = false;
 //   codes: any = [];
 //   colors: Array<any> = [{ 'code': 'green', 'name': 'Green', 'colorClass': 'dot_green' }, { 'code': 'blue', 'name': 'Blue', 'colorClass': 'dot_blue' }, { 'code': 'grey', 'name': 'Grey', 'colorClass': 'dot_grey' }, { 'code': 'red', 'name': 'Red', 'colorClass': 'dot_red' }];
 //   pageGroup: FormGroup;
 //   deleteLookupItemValue: any;
 //   index: any;
 //   private _lookupService: any;
 //   alertService: any;

    //public dialogRef: MatDialogRef<AddValidationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,




   close(): void {
     //this.dialogRef.close();
   }

   saveLookup() {
     // if(this.data != null)
     {
       if (this.editLookupGroup.valid) {
         // this._lookupService.EditLookups(this.editLookupGroup.value).subscribe(res => {
         //   if(res != null) {
         //     this.dialogRef.close(res['Data']);
         //   }
         //   else{
         //     this.alertService.createAlert(res['Message'], 0);
         //   }
         // });
       }
     }

     // else{
     //   if (this.addLookupGroup.valid) {
     //     this._lookupService.AddLookups(this.addLookupGroup.value).subscribe(res => {
     //       if(res != null) {
     //         this.dialogRef.close(res['Data']);
     //       }
     //       else{
     //         this.alertService.createAlert(res['Message'], 0);
     //       }
     //     });
     //   }

     // }
   }

   initTechnologyFields(): FormGroup {
     return this.fb.group({
       LookupId: [],
       LookupName: ['', Validators.required]
     });
   }

   addNewInputField(val): void {
     console.log(val, "test")

     if (val > 0) {
       for (let i = 0; i < val; i++) {
         console.log("test")

         const control = <FormArray>this.addLookupGroup.controls.lookupNameDetails;
         control.push(this.initTechnologyFields());
       }
     }
     else {
       const control = <FormArray>this.addLookupGroup.controls.lookupNameDetails;
       control.push(this.initTechnologyFields());
     }


   }

   fnLookupDeleteItemModal(i) {
     this.index = i;
     this.removeInputField(this.index);
   }

   removeInputField(i: number): void {
     const control = <FormArray>this.addLookupGroup.controls.lookupNameDetails;
     control.removeAt(i);
   }


 createItem() {
   return this.fb.control(''); // Or a FormGroup if complex object
 }

  note() {

     let dialogRef = this.dialog.open(NoteComponent, {

       height: 'auto',
       width: '600px'
     });
     dialogRef.afterClosed().subscribe(data => {
     });
   }
   addlog() {
     let dialogRef = this.dialog.open(LogauditresultComponent, {

       height: 'auto',
       width: '1300px'
     });
     dialogRef.afterClosed().subscribe(data => {
     });

   }
 selectCheckBox() {

   }
 public adddocument(auditdata) {
     let dialogRef = this.dialog.open(ActionDocumentTwoDialogComponent, {
       data: auditdata,
       height: 'auto',
       width: '600px'
     });
     dialogRef.afterClosed().subscribe(data => {
     });
   }

   public adddocumenttype(audit) {
     let dialogRef = this.dialog.open(ActionDocumentTwoTypeComponent, {
       data: audit,
       height: 'auto',
       width: '600px'
     });
     dialogRef.afterClosed().subscribe(data => {
     });
   }
   valyes=[
     {date:'17/10/2020',refer:'MG/822441',Done:'Vishvajit jere'},
       {date:'17/10/2020',refer:'MG/822441',Done:'Vishvajit jere'},
      {date:'17/10/2020',refer:'MG/822441',Done:'Vishvajit jere'},
     {date:'17/10/2020',refer:'MG/822441',Done:'Vishvajit jere'},
     {date:'17/10/2020',refer:'MG/822441',Done:'Vishvajit jere'}
   ]

   dataList = [
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Tejaswi",
       department: "QA",
       issue: "Engine Overheating",
       details: "enginee getting sound",
       date: "2024-09-20",
       status: "Open",
       eta:"024-09-20",
       meetingRef:"(Meet/2025/10/02)",
       actions: { edit: true, delete: true }
     },
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Hrithik",
       department: "Quality",
       issue: "Brakes Squeaking not working",
       details: "Brakes Squeaking not working",
       date: "2024-09-24",
       status: "Pending",
       eta:"024-09-20",
        meetingRef:"(Meet/2025/10/03)",
       actions: { edit: true, delete: true }
     },
     {
       title: "This road hazard service is part of Bosch’s connected map issue (FIELD/2024/09/8)",
       role: "Sai",
       department: "QA",
       issue: "Transmission Slipping",
       details: "Transmission Slipping is not good",
       date: "2024-09-24",
       status: "WIP",
        meetingRef:"(Meet/2025/10/03)",
       actions: { edit: true, delete: true }
     },
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Krishna",
       department: "Account",
       issue: "Transmission Slipping",
       details: "Transmission Slipping",
       date: "2024-09-24",
       status: "WIP",
        meetingRef:"(Meet/2025/10/04)",
       actions: { edit: true, delete: true }
     },
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Vishnu",
       department: "Developer",
       issue: "Battery Draining",
       details: "Battery Draining",
       date: "2024-09-24",
       status: "Pending",
        meetingRef:"(Meet/2025/10/05)",
       actions: { edit: true, delete: true }
     },
     {
       title: "Global fleet of connected vehicles (FIELD/2024/09/3)",
       role: "Roshan",
       department: "QA",
       issue: "Unusual Vibrations",
       details: "Unusual Vibrations",
       date: "2024-09-24",
       status: "Open",
        meetingRef:"(Meet/2025/10/06)",
       actions: { edit: true, delete: true }
     },
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Mohit",
       department: "Quality",
       issue: "Brakes Squeaking not working",
       details: "Brakes Squeaking not working",
       date: "2024-09-24",
       status: "Open",
        meetingRef:"(Meet/2025/10/07)",
       actions: { edit: true, delete: true }
     },
     {
       title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
       role: "Satyarth",
       department: "Quality",
       issue: "Brakes Squeaking not getting",
       details: "Brakes Squeaking not working",
        meetingRef:"(Meet/2025/10/08)",
       date: "2024-09-24",
       status: "Pending",
       actions: { edit: true, delete: true }
     }
   ];

 }














