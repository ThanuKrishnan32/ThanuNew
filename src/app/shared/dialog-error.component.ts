import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogErrorData } from './dialogerrordata.model';

@Component({
    selector: 'app-dialog-error',
    templateUrl: './dialog-error.component.html',
})
export class DialogErrorComponent{
    constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorData) {}
}