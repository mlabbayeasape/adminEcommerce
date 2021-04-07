import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {


  aquaticCreatures = new BehaviorSubject(['shark', 'dolphin', 'octopus']);

  addAquaticCreature(newAquaticCreature) {
    this.aquaticCreatures.next(newAquaticCreature);
  }

}
