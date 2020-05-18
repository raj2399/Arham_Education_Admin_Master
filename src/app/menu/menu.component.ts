import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    role:number=0;
  constructor(private breakpointObserver: BreakpointObserver,private _route:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
  }

  logout()
  {

    localStorage.setItem('email_id',"");

    localStorage.setItem('faculty_type',"0");
    localStorage.setItem('faculty_id',"0");
    this._route.navigate(['']);

  }
}
