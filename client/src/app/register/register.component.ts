import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  constructor(private accoutService: AccountService) { }

  ngOnInit(): void {

  }

  register() {
    this.accoutService.register(this.model).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  cancel(){
    this.cancelRegister.emit(false)
  }

}