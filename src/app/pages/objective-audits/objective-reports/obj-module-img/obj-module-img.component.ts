import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obj-module-img',
  templateUrl: './obj-module-img.component.html',
  styleUrls: ['./obj-module-img.component.scss']
})
export class ObjModuleImgComponent implements OnInit {
  filterToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


element = document.getElementById('some-id');
if (element:any) {
  element.classList.add('some-class');
}

viewMode: number = 2; // 1 = single view, 2 = double view

   images = [
    { title: 'Right Fender', src: '/assets/Right_fender.jpeg',height: '288px', width: '480px' },
    { title: 'Right Front Door', src: '/assets/Right_Front_Door.jpeg',height: '350px', width: '350px' },
    { title: 'Right Rear Door', src: '/assets/Right_Rear_Door.jpeg',height: '350px', width: '350px' },
    { title: '  Rear', src: '/assets/Rear.jpeg',height: '350px', width: '400px' },
    { title: 'Left Rear Door', src: '/assets/Left_Rear_Door.jpeg',height: '350px', width: '350px' },
      { title: 'Left Front Door', src: '/assets/Left_Front_Door.jpeg',height: '350px', width: '350px' },
    { title: 'Left Fender  ', src: '/assets/Left_Fender.jpeg',height: '288px', width: '480px' },
    { title: '  Roof', src: '/assets/Roof.jpeg',height: '290px', width: '500px' },
    { title: '    Bonnet', src: '/assets/Bonnet.jpeg',height: '320px', width: '450px' }
  ];




}
