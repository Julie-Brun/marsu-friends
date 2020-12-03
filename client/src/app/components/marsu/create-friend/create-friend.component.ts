import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MarsuService } from '../../../services/marsu.service';

@Component({
  selector: 'app-create-friend',
  templateUrl: './create-friend.component.html',
  styleUrls: ['./create-friend.component.css']
})
export class CreateFriendComponent implements OnInit {

  @Output() createStatus = new EventEmitter<boolean>();
  // @Input() updatedStatus: any;

  createForm: FormGroup;

  constructor( private fb: FormBuilder, private marsuService: MarsuService, private actRoute: ActivatedRoute ) {
    this.createForm = this.fb.group({
      createName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  emitStatus(status: any) {
    this.createStatus.emit(status);
  }

  onSubmitCreate() {
    if(this.createForm.valid) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      let createName = this.createForm.get('createName')?.value;
      const data = {
        name: createName
      };
      
      this.marsuService.createFriend(id, data)
        .subscribe(response => {
          this.emitStatus(response);
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
