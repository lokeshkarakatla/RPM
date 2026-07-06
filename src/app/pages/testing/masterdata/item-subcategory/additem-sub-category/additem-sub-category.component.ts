import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-additem-sub-category',
  templateUrl: './additem-sub-category.component.html',
  styleUrls: ['./additem-sub-category.component.scss']
})
export class AdditemSubCategoryComponent implements OnInit {

  isSubmitting = false;
  myGroup!: FormGroup;

  constructor(
    public _fb: FormBuilder,
    public dialogRef: MatDialogRef<AdditemSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private _MasterDataService: MasterDataService
  ) {
  }

  categoryList: { CategoryId: number; CategoryName: string }[] = [
  { CategoryId: 1, CategoryName: 'Metals' },
  { CategoryId: 2, CategoryName: 'Plastics' },
  { CategoryId: 3, CategoryName: 'Electronics' },
  { CategoryId: 4, CategoryName: 'Hardware' },
  { CategoryId: 5, CategoryName: 'Internal Assemblies' },
  { CategoryId: 6, CategoryName: 'Primary Packaging' },
  { CategoryId: 7, CategoryName: 'Secondary Packaging' },
  { CategoryId: 8, CategoryName: 'Tools' },
  { CategoryId: 9, CategoryName: 'Safety Equipment' }
];

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
      // this._MasterDataService.UpsertSubCategory(this.myGroup.value).subscribe((data: any) => {
      //   if (data['Success']) {
      //     this.dialogRef.close("Update");
      //   }
      // })
    }
  }

  formInit(data: any) {
    this.myGroup = this._fb.group({
      CategoryId: new FormControl(data?.CategoryId),
      CategoryName: new FormControl(data?.CategoryName, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9\- ]*[a-zA-Z0-9]$")])),
    });
  }

  // convienience getter for form
  get f() { return this.myGroup.controls }

  close(): void {
    this.dialogRef.close();
  }

}