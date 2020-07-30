import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  public Editor = ClassicEditor;
  legendDefinitions = [
    {
      id: 1,
      name: 'Target achieved / on track',
      color: '#008000',
      startValue: 67,
      endValue: 100,
    },
    {
      id: 2,
      name: 'Progress, but more effort required',
      color: '#FFFF00',
      startValue: 33,
      endValue: 67,
    },
    {
      id: 3,
      name: 'Not on track',
      color: '#FF0000',
      startValue: 0,
      endValue: 33,
    },
    { id: 4, name: 'N/A', color: '#D3D3D3', default: true },
    { id: 5, name: 'No data', color: '#FFFFFF', default: true },
  ];
  constructor() {}

  ngOnInit(): void {}
}
