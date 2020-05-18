import { Component, OnInit } from '@angular/core';
import { BatchService } from 'src/app/Services/batch.service';
import { batch_class } from 'src/app/classes/batch_class';
import { StudentService } from 'src/app/services/student.service';
import { student_class } from 'src/app/classes/student_class';
import { AttendanceService } from 'src/app/services/attendance.service';
import { attendance_class } from 'src/app/classes/attendance_class';


class stu_abs
{
  constructor(
  public Student_id:number,
  public Status:boolean){}
}

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.css']
})
export class AttendanceAddComponent implements OnInit {

  batches:batch_class[];
  students:student_class[];
  Batch_no:number;
  student_abs:stu_abs[]=[];

  constructor(private batch_ser:BatchService,private student_ser:StudentService,private att_ser:AttendanceService) { }


  onbatchSelect()
  {
    console.log(this.Batch_no);
    this.student_ser.getStudentByBatchId(this.Batch_no).subscribe(
      (data:student_class[])=>
      {
        console.log(data);
        this.students=data;
        for(let i=0;i<data.length;i++)
        {
          this.student_abs.push(new stu_abs(data[i].Student_id,true));
        }
      }
    );
  }

  onChange(index)
  {
    if(this.student_abs[index].Status)
    this.student_abs[index].Status=false;
    else
    this.student_abs[index].Status=true;

    console.log(this.student_abs[index]);
  }

  onclickCancle()
  {

  }

  onclickAdd()
  {
    let x=0;

    for(x=0;x<this.student_abs.length;x++)
    {

        this.att_ser.addAttendance(new attendance_class(this.student_abs[x].Student_id,this.student_abs[x].Status)).subscribe(
          (data:any)=>
          {
            console.log(data);
            if(data.errno== 1062)
            {

              x=this.student_abs.length;
              alert("Attendance already taken");

            }
          }
        );

    }

    // if((x==this.student_abs.length) )
    //   {

    //   }


  }



  ngOnInit() {
    this.batch_ser.getAllBatch().subscribe(
      (data:batch_class[])=>
      {
        this.batches=data;
      }
    );
  }

}
