import { Component } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-bottomsheet-legend',
    templateUrl: './bottomsheet-legend.component.html',
})
export class BottomSheetLegendComponent{
    constructor(
    public bottomsheetRef: MatBottomSheetRef<BottomSheetLegendComponent>){}

    openLink(event: MouseEvent): void {
        this.bottomsheetRef.dismiss();
        event.preventDefault();
      }
}