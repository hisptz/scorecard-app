import { Component, OnInit } from '@angular/core';
export interface SampleTableData {
  orgunit: string;
  bcg: any;
  dpt: any;
  dpt1_coverage: any;
  dpt2_coverage: any;
  dpt3_coverage: any;
}


@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.css']
})
export class BasicViewComponent implements OnInit {
 sampleTableData: SampleTableData[] = [
    {
      orgunit: 'Bird District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Cat District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Dinner District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Dog District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Fruit District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Dessert District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Insect District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
    {
      orgunit: 'Sweet District', bcg: this.randomNumber() , 
     dpt: this.randomNumber(), dpt1_coverage: this.randomNumber(), 
     dpt2_coverage: this.randomNumber(), dpt3_coverage: this.randomNumber()
    },
  ];
  displayedColumns: string[] = ['orgunit', 'bcg', 'dpt', 'dpt1_coverage', 
                                 'dpt2_coverage' , 'dpt3_coverage'     ];
  headerColumn: string[] = ['search'];                          

  constructor() { }

  ngOnInit() {
  }
  randomNumber(): number {
    return Math.floor(Math.random() * 100);
  }

}
