import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class CreateHeaderComponent implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit() {}

  cancelCreate() {
    this.router.navigate(['/']);
 }


}
