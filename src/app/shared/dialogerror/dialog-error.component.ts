import { Component,Inject } from '@angular/core';
import { DialogErrorData } from '../models/dialogerrordata.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-error',
    templateUrl: './dialog-error.component.html',
})
export class DialogErrorComponent{
    public constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorData) {}
}