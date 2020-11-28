import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MarsuService } from '../../../services/marsu.service';

@Component({
  selector: 'app-marsu-details',
  templateUrl: './marsu-details.component.html',
  styleUrls: ['./marsu-details.component.css']
})
export class MarsuDetailsComponent implements OnInit {

  currentUser: any = {};
  isEditing: boolean = false;

  updateForm: FormGroup;

  constructor(public marsuService: MarsuService, private actRoute: ActivatedRoute, private fb: FormBuilder) { 
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      age: [''],
      family: [''],
      race: [''],
      food: ['']
    })
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.marsuService.getProfile(id).subscribe((res: any) => {
      this.currentUser = res;
    })
    this.updateForm.get('name')?.setValue(this.currentUser[0].name);
    this.updateForm.get('age')?.setValue(this.currentUser[0].age);
    this.updateForm.get('family')?.setValue(this.currentUser[0].family);
    this.updateForm.get('race')?.setValue(this.currentUser[0].race);
    this.updateForm.get('food')?.setValue(this.currentUser[0].food);
  }

  onEdit() {
    if(this.isEditing === false) {
      this.isEditing = true;
    } else {
      if(this.updateForm.valid) {
        const name = this.updateForm.get('name')?.value;
        const age = this.updateForm.get('age')?.value;
        const family = this.updateForm.get('family')?.value;
        const race = this.updateForm.get('race')?.value;
        const food = this.updateForm.get('food')?.value;
        const data = {
          name: name,
          age: age,
          family: family,
          race: race,
          food: food
        };
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.marsuService.updateProfile(id, data).subscribe((res: any) => {
          console.log(res);
          this.ngOnInit();
        });
        this.isEditing = false;
      } else {
        console.log('There is a problem with the form, houba !');
      }
    }
  }
}
