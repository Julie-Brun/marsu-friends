import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MarsuService } from '../../../services/marsu.service';

@Component({
  selector: 'app-create-friend',
  templateUrl: './create-friend.component.html',
  styleUrls: ['./create-friend.component.css']
})
export class CreateFriendComponent implements OnInit {

  createStatus: boolean = false;

  createForm: FormGroup;

  constructor( private fb: FormBuilder, private marsuService: MarsuService, private actRoute: ActivatedRoute ) {
    this.createForm = this.fb.group({
      createName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmitCreate() {
    if(this.createForm.valid) {
      const createName = this.createForm.get('createName')?.value;
      let id = this.actRoute.snapshot.paramMap.get('id');

      this.marsuService.createFriend(id, JSON.stringify(createName))
        .subscribe(response => {
          this.createStatus = true;
          setTimeout(() => {
            this.createStatus = false;
          }, 4000);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('There is a problem with the form, houba !');
    }
  }
}
