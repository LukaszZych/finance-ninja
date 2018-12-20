import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingsForm: FormGroup;

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.settingsForm = this.initializeForm();

    this.settingsForm.valueChanges.subscribe((value) => {
      console.log(value.language);
      this.translate.use(value.language);
    });
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      language: [null, [Validators.required]]
    });
  }
}
