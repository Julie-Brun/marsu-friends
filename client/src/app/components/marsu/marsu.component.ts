import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marsu',
  templateUrl: './marsu.component.html',
  styleUrls: ['./marsu.component.css']
})
export class MarsuComponent implements OnInit {

  createStatus: any = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateStatus(status: any) {
    this.createStatus = !this.createStatus;
    setTimeout(() => {
      this.createStatus = !this.createStatus;
    }, 4000);
  }
}
