import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MarsuService } from '../../../services/marsu.service';

@Component({
  selector: 'app-create-friend',
  templateUrl: './create-friend.component.html',
  styleUrls: ['./create-friend.component.css']
})
export class CreateFriendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
