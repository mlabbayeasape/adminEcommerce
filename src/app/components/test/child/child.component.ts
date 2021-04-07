import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {
  @Input() data: Observable<any>;
  aquaticCreatures: string[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.data.subscribe(newAquaticCreature => {
      this.aquaticCreatures = [...this.aquaticCreatures, ...newAquaticCreature];
      this.cd.markForCheck();
    });
  }
}
