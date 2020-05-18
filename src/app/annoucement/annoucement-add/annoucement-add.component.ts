import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { announcement_class } from '../../classes/announcement_class';
import { Router } from "@angular/router";
import { batch_class } from "../../classes/batch_class";
@Component({
  selector: 'app-annoucement-add',
  templateUrl: './annoucement-add.component.html',
  styleUrls: ['./annoucement-add.component.css']
})
export class AnnoucementAddComponent implements OnInit {

 Title:string;
   Announcemnet:string;
   Date:Date;
  Batch_id:number;
  Batch_list:batch_class[]=[];

  constructor(private _ser:AnnouncementService,private _router:Router) { }

  ngOnInit() {

    this._ser.getAllBatch().subscribe((data:batch_class[]) => {
      this.Batch_list = data;
    });



  }
  keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Title.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }

  onclickCancle()
  {
    this._router.navigate(['menu/announcement_home']);
  }

  onclickAdd() {
    console.log(this.Announcemnet);
    console.log(this.Batch_id);
    console.log(this.Title);
    console.log(this.Date);


    this._ser.addAnnouncement(new announcement_class(this.Title,this.Announcemnet,this.Date,this.Batch_id)).subscribe((data:any)=>{
      console.log(data);
      this._router.navigate(['menu/announcement_home']);

    })
  }


}
