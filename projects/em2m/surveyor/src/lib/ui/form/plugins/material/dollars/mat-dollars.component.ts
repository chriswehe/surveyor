import {Component} from '@angular/core';
import {SurveyorFormInputComponent} from '../../../form-input-component';
import {MaskedValue} from '../../../../mask/mask.model';

@Component({
  selector: 'surveyor-mat-dollars-input',
  templateUrl: './mat-dollars.component.html',
  styleUrls: ['./mat-dollars.component.scss'],
})
export class MaterialDollarsComponent extends SurveyorFormInputComponent {

  controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight'];

  applyMask($event: any) {
    if (this.controlDefinition.options.mask && this.controlKeys.indexOf($event.key) === -1) {
      $event.preventDefault();
      let maskedVal = this.controlDefinition.options.mask.masker($event, this.formControl.value);
      if (typeof maskedVal === 'string') {
        this.formControl.setValue(maskedVal, {});
      } else {
        let values: MaskedValue = maskedVal;
        this.formControl.setValue(values.modelValue, {});
      }
    }
  }

  setValue(val: string) {
    if (this.controlDefinition.options.mask) {
      let lastKey = val.substring(val.length - 1);
      let priorVal = val.substring(0, val.length - 1);
      this.formControl.setValue(priorVal);

      let fakeEvent = {
        key: lastKey,
        preventDefault: () => {}
      };
      // Hacked in by JackVCurtis, who hangs his head in shame until TODO: fix view value not updating on load
      setTimeout(() => {
        this.applyMask(fakeEvent);
      });
    } else {
      this.formControl.setValue(val, {});
    }
  }
}
