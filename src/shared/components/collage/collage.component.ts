import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss']
})
export class CollageComponent {
  @Input() imgPaths: Array<string> = [];
}
