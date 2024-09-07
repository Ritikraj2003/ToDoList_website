import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import User from '../../types/user';
import { UserService } from '../../servive/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formBuilder=inject(FormBuilder);
  userForm : FormGroup=this.formBuilder.group({
    Assigned:['',[Validators.required]],
    Status:['',[Validators.required]],
    Due_date:['',[Validators.required]],
    Priority:['',[Validators.required]],
    Comments:[''],
    });
    userService=inject(UserService);
    router=inject(Router);
    route=inject(ActivatedRoute);
    editUserId!: String;
    ngOnInit(){
      this.editUserId=this.route.snapshot.params["id"];
      if(this.editUserId){
        this.userService.getUser(this.editUserId).subscribe(result=>{
          this.userForm.patchValue(result);
        })
      }
    }
addUser(){
  if(this.userForm.invalid){
    alert('please provide vaild data');
    return;
  }
  const model: User=this.userForm.value;
  this.userService.addUser(model).subscribe(result=>{

    alert("User added successfully.");
    this.router.navigateByUrl("/");

  })
}
UpdateUser(){
  if(this.userForm.invalid){
    alert('please provide vaild data');
    return;
  }
  const model: User=this.userForm.value;
  this.userService.updateUser(this.editUserId,model).subscribe(result=>{
    alert("Updated successfully.");
    this.router.navigateByUrl("/");
  });

}
}
