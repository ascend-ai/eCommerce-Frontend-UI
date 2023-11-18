import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public names: Array<string> = [
    'Yash',
    'Faazil',
    'Sujeet'
  ];

  constructor(private fb: FormBuilder) {}

  public addName(): void {
    this.names.push('Dummy');
  }
}
