import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marsu',
  templateUrl: './marsu.component.html',
  styleUrls: ['./marsu.component.css']
})
export class MarsuComponent implements OnInit {

  createStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateStatus() {
    this.createStatus = true;
    setTimeout(() => {
      this.createStatus = false;
    }, 4000);
  }

}
