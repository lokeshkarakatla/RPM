import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.scss']
})
export class AddItemCategoryComponent implements OnInit {

  isSubmitting = false;
  roles: any;
  myGroup!: FormGroup;
  users!: any[];
  agencies!: any[];
  managers!: any[];

  constructor(
    public _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private _MasterDataService: MasterDataService
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.formInit(this.data)
    } else {
      this.formInit(null)
    }
  }

  upsertCategory() {
    this.isSubmitting = true;
    if (this.myGroup.valid) {
      // this._MasterDataService.UpsertCategory(this.myGroup.value).subscribe((data: any) => {
      //   if (data['Success']) {
      //     this.dialogRef.close("Update");
      //   }
      // })
    }
  }

  formInit(data: any) {
    this.myGroup = this._fb.group({
      CategoryId: new FormControl(data?.CategoryId),
      //  CategoryName: new FormControl(data?.CategoryName, Validators.compose([Validators.required])),
      CategoryName: new FormControl(data?.CategoryName, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9\- ]*[a-zA-Z0-9]$")])),

    });
  }

  // convienience getter for form
  get f() { return this.myGroup.controls }

  close(): void {
    this.dialogRef.close();
  }

}