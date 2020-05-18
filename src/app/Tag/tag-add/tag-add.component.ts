import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagService} from '../../services/tag.service';
import {tag_class} from '../../classes/tag_class';
import { Router, ActivatedRoute } from '@angular/router';
import {TagHomeComponent} from '../tag-home/tag-home.component';
import {SubjectService } from '../../services/subject.service';
import {subject_class} from '../../classes/subject_class';


@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent implements OnInit {
  Tag_arr:tag_class[];
  Name:string;
  Subject_id:number=0;
  Status:number=1;
  flag:boolean=false;
  i:number;
  subject_list:subject_class[]=[];

  constructor(private _sub:SubjectService,private _ser:TagService,private _router:Router,private matDialog:MatDialogRef<TagHomeComponent>,private _act:ActivatedRoute) {
  }
  ngOnInit() {

    this._sub.getAllSubject().subscribe((data:subject_class[])=>{
      this.subject_list=data;
    });
    this.flag=true;
  }

  onclickAdd()
  {
    if(this.flag==true)
    {

   this._ser.addTag(new tag_class(this.Name,this.Subject_id)).subscribe(
     (data:any)=>
     {
       if(data.errno==1062)
       {
        alert('Topic already exits');

       }
       else
       {
        console.log(data);
       }

       this._router.navigate(['menu/tag_home']);
       //this.currentdialog.close();
       this.matDialog.close();
     }
   );
  }
  }
 onclickCancle()
 {
  this.flag=false;
  if(this.flag==false)
  {
    console.log(this.flag);
    this.matDialog.close();
    this._router.navigate(['menu/tag_home']);
   //this._router.navigate(['menu/color_home']);

 }

 }


}

