import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public languages: string[] = [
    'polish', 'english'
  ];

  public settingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      language: [null, [Validators.required]]
    });
  }

}
