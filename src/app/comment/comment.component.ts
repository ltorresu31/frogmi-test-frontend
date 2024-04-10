import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  body: string = ""
  constructor(public dialogRef: MatDialogRef<CommentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
