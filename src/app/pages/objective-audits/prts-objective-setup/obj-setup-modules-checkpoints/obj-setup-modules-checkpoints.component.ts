import { ObjImageDialogComponent } from './obj-image-dialog/obj-image-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ObjSetupAudittypessComponent } from './obj-setup-audittypess/obj-setup-audittypess.component';
import { ImageGallaryZoneDialogComponent } from 'src/app/pages/subjective-audits/prts-subjective-setup/sub-setup-image-gallery/image-gallary-zone-dialog/image-gallary-zone-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from 'src/app/pages/testing/testing-projects/add-projects/status-confirmation-dialog/status-confirmation-dialog.component';
import { ModelspopComponent } from 'src/app/pages/subjective-audits/prts-subjective-setup/sub-setup-module-master/section-pop/modelspop/modelspop.component';

@Component({
  selector: 'app-obj-setup-modules-checkpoints',
  templateUrl: './obj-setup-modules-checkpoints.component.html',
  styleUrls: ['./obj-setup-modules-checkpoints.component.scss']
})
export class ObjSetupModulesCheckpointsComponent implements OnInit {

  filterToggle = false;
  gridToggle = false;
  Status =
    [{ name: 'Active', value: true },
    { name: "Inactive", value: false }];

  constructor(
    public dialog: MatDialog,
    public router: Router) { }

  values = []
  hidden = false;
  url = "/assets/carrear.jpeg"
  Image: any = '/assets/car.png';

  // values1 = [
  //   { title: 'Back Rear Grill', image: "/assets/part1.png", checkpoints: '3', },
  //   { title: 'Front right head lamp', image: "/assets/part2.png", checkpoints: '7', },
  //   { title: 'Back Rear tail lamp', image: "/assets/part3.png", checkpoints: '2', },
  //   { title: 'Front Bumper section', image: "/assets/part5.png", checkpoints: '4', },

  // ]
    modelspop() {
    this.dialog.open(ModelspopComponent, {
      height: '300px',
      width: '700px'
    });
  }
  ngOnInit() {
    if (environment.mode == 1) {
      this.values = this.values1
    }
    else {
      return;
    }
  }


  values1 = [
    { audit: '200', module: 'Right Fender', checkpoint: '50', min: '10x10', max: '10', status: true, image: "/assets/Right_fender.jpeg" ,model:'Fortuner',audittype : '4/9' },
    { audit: '961', module: 'Right Front Door', checkpoint: '35', min: '10x10', max: '10', status: true, image: "/assets/Right_Front_Door.jpeg", model:'Toyota',audittype : '6/9'  },
    { audit: '10', module: 'Right Rear Door', checkpoint: '45', min: '10x10', max: '10', status: true, image: "/assets/Right_Rear_Door.jpeg", model:'Toyota Fortuner' ,audittype : '5/9'},
    { audit: '50', module: 'Rear', checkpoint: '40', min: '10x10', max: '10', image: "/assets/Rear.jpeg", model:'Hyundai',audittype : '4/9' },
    { audit: '290', module: 'Left Rear Door', checkpoint: '27', min: '10x10', max: '10', status: true, image: "/assets/Left_Rear_Door.jpeg",model:'Ferrari' ,audittype : '7/9'},
    { audit: '982', module: 'Left Front Door', checkpoint: '33', min: '10x10', max: '10', status: true, image: "/assets/Left_Front_Door.jpeg",model:'Toyota' ,audittype : '6/9'},
    { audit: '781', module: 'Left Fender', checkpoint: '38', min: '10x10', max: '10', status: true, image: "/assets/Left_Fender.jpeg", model:'BMW',audittype : '5/9' },
    { audit: '108', module: ' Roof', checkpoint: '37', min: '10x10', max: '10', status: true, image: "/assets/Roof.jpeg",model:'Ruby',audittype : '4/9' },
   { audit: '851', module: ' Bonnet', checkpoint: '39', min: '10x10', max: '10', status: true, image: "/assets/Bonnet.jpeg",model:'Ruby',audittype : '5/9' },
  ]
  opendashboard() {
    window.open('/#/parameter-dashboard/issuelog-par'); 
  }
 
  addcheckpoint(item) {
    this.router.navigate(['/app/setup/subjective/overview']);

  }
  saveStatus() {
    // this.alertService.createAlert('Successfully saved.', 1);
  }

imageSource(val: string) {
  this.dialog.open(ObjImageDialogComponent, {
    width: 'auto',
    height: 'auto',
    data: {
      image: val
    }
  });
}
         deleteConfirmation(item: any) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: { ProjectId: item.ProjectId, title: 'Delete Confirmation', content: 'Are you sure you want to Delete?' }
    });

}
      Confirmation(item: any) {
    let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: { TractorStatusId: item.TractorStatusId, title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
    });
  }
  openUploadCSV() {

  }

  downloadSampleExcel() {

  }

    imageSource1(val) {
      this.Image = val;
      this.hidden = true;
      this.dialog.open(ImageGallaryZoneDialogComponent, {
        width: "600px",
        height: "auto"
      })

    }

  openAuditTypes() {
      let dialogRef = this.dialog.open(ObjSetupAudittypessComponent, {
        data: null,
        height: 'auto',
        width: '600px'
      });

    }


}
