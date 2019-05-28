import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-successfulsend',
  templateUrl: './successfulsend.page.html',
  styleUrls: ['./successfulsend.page.scss'],
})
export class SuccessfulsendPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goDashboard()
  {
    this.router.navigate(['/dashboard'])
  }

}
