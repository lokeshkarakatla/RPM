import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { MenuService } from "src/app/theme/components/menu/menu.service";
import { environment } from "src/environments/environment";
import { admindata } from "../admindata";
import { AddLookupDialogComponent } from "./add-lookup-dialog/add-lookup-dialog.component";

@Component({
  selector: "app-lookup",
  templateUrl: "./lookup.component.html",
  styleUrls: ["./lookup.component.scss"],
})
export class LookupComponent implements OnInit {
  Status = [
    { name: "Active", value: true },
    { name: "Inactive", value: false },
  ];

  public popoverTitle: string = "Confirm Delete";
  public popoverMessage: string = "Are you sure you want to delete this.?";
  public popoverStatusTitle: string = "Confirm Status Change";
  public popoverStatusMessage: string =
    "Are you sure you want to change vcStatus.?";
  public cancelClicked: boolean = false;

  filterToggle: boolean;

  public searchText: string;
  public page: any;

  constructor(
    //public appSettings: AppSettings,
    public dialog: MatDialog,
    //private alertService: AlertService
  ) {}

  tableList: any[] = [];
  ngOnInit() {
    if (environment.mode == 1) {
      this.tableList = admindata.lookUp();
      this.getCategory();
    }
  }

  public addlookup(applicant) {
    let dialogRef = this.dialog.open(AddLookupDialogComponent, {
      data: applicant,
      height: "auto",
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (applicant) {
          applicant.CodeMasterName = data.CodeMasterName;
          applicant.LookupName = data.LookupName;
        } else {
          this.tableList.push({
            vcStatus: true,
            CodeMasterName: data.CodeMasterName,
            LookupName: data.LookupName,
          });
        }
      }
    });
  }

  deleteUser() {
    // this.alertService.createAlert('Successfully deleted.', 1);
  }

  saveStatus() {
    //this.alertService.createAlert('Successfully saved.', 1);
  }

  categoryList: string[] = [];

  categories = [
    "IT Equipment",
    "Media Equipment",
    "Infrastructure",
    "Office Furniture",
    "Networking Equipment",
    "Electrical Equipment",
    "Safety Equipment",
    "Laboratory Equipment",
  ];

  getCategory(): void {
    this.tableList = this.tableList.map((item, index) => ({
      ...item,
      AssetCategory: this.categories[index % this.categories.length],
    }));
  }
}
