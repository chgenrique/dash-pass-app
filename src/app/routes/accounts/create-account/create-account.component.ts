import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  public formAccount: FormGroup;
  public registry: Account;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder) { 
    this.formAccount = this.formBuilder.group({
      'title': [null, Validators.required],
      'userName': [null, Validators.required],
      'email': [null, Validators.required],
      'accountPassword': [null, Validators.required],
      'url': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
  }

  onSubmit(post: any) {
    //this.post = post;
  }

  save(): void {
    if (this.formAccount.valid) {
      if (this.formAccount.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const validationRegistry = { ...this.registry, ...this.formAccount.value };
        //validationRegistry.specNumbers = this.validationSpecNumbers;
        /*
        this.service.createValidationRegistry(validationRegistry)
          .subscribe(
            {
              next: async (resp) => {
                this.onSaveComplete(resp)
              },
              error: (e) => this.errorMessage = <any>e,
            }
          ); */
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  clear(){

  }
}
