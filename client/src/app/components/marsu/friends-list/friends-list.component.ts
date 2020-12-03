import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarsuService } from '../../../services/marsu.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  @Input() createStatus: any;

  allUsers: any;

  constructor(private actRoute: ActivatedRoute, private marsuService: MarsuService) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.marsuService.getAllExceptUserLoggedIn(id).subscribe((res: any) => {
      this.allUsers = res;  
    },
    (error) => {
      console.log('Help, error !', error);
    },
    () => {
      console.log('Observation complete !');
    });
  }
 
  onUpdateList() {
    if(this.createStatus === true) 
      this.ngOnInit();
  }
}
