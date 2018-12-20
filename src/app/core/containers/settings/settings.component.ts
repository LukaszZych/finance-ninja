import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public settingsForm: FormGroup;

  private subscription = new Subscription();

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.settingsForm = this.initializeForm(this.translate.currentLang);

    this.subscription.add(
      this.settingsForm.valueChanges.subscribe((value) => {
        this.translate.use(value.language);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(language: string): FormGroup {
    return this.formBuilder.group({
      language: [language, [Validators.required]]
    });
  }
}
