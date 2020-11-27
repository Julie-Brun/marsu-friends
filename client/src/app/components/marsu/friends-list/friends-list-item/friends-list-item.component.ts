import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MarsuService } from '../../../../services/marsu.service';

@Component({
  selector: 'app-friends-list-item',
  templateUrl: './friends-list-item.component.html',
  styleUrls: ['./friends-list-item.component.css']
})
export class FriendsListItemComponent implements OnInit {

  @Input() userName: string = '';
  @Input() user: any;

  friendship: any;

  constructor(private marsuService: MarsuService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');

    this.marsuService.getFriends(id).subscribe((res: any) => {
      if(res[0].friends !== undefined) {
        let userFriends = res[0].friends;
        for(let i = 0; i < userFriends.length; i++) {
          if(userFriends[i] === this.user._id) {
            return this.friendship = true;        
          }
        }
        return this.friendship = false;
      } else {
        return this.friendship;
      }
    })
  }

  onFriend() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    if(!this.friendship) {      
      this.marsuService.addFriend(this.user._id, id).subscribe();
      this.friendship = true;
    } else {
      this.marsuService.deleteFriend(this.user._id, id).subscribe();
      this.friendship = false;
    }
  }
}
