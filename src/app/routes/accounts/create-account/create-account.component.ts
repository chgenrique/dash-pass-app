import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Category, Question } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit, AfterViewInit{
  public formAccount: FormGroup;
  public registry: Account;
  errorMessage!: string;
  permissionToDelete: true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  categoryList: Category[] = [
    { categoryId: 1, description: 'Extra cheese' },
    { categoryId: 2, description: 'Mushroom' },
    { categoryId: 3, description: 'Onion' },
    { categoryId: 3, description: 'Pepperoni' },
    { categoryId: 3, description: 'Sausage' },
    { categoryId: 3, description: 'Tomato' }];

  constructor(
    private accountsService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { 
    this.formAccount = this.fb.group({
      'id': [null],
      'title': [null, Validators.required],
      'userName': [null, [Validators.required, Validators.minLength(3)]],
      'email': [null, [Validators.required, Validators.email]],
      'accountPassword': [null, [Validators.required, Validators.minLength(5)]],
      'url': [null, Validators.required],
      'emailAsUser': [false],
      'description': null,
      'recoveryCode': null,
      'notes': null,
      'securityQuestions': [],
      'categories': [],
    });
  }

  ngOnInit() {
    this.createForm();

    this.formAccount.controls.securityQuestions = this.fb.array([this.createQuestionGroup()]);
  }

  ngAfterViewInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) {
      return;
    }

    this.accountsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      for (let i = 1; i < contact.securityQuestions.length; i++) {
        this.addQuestion();
      }
      this.formAccount.setValue(contact);
    });
  }

  get securityQuestions(): FormArray {
    return <FormArray>this.formAccount.get('securityQuestions');
  }

  createQuestionGroup() {

    let max = 1;
    if(this.securityQuestions.length > 0) {
      this.securityQuestions.controls.forEach((curr, index) => {
        if(max < curr.value.order)
          max = curr.value.order
     });
     max = max + 1;
    }

    const phoneGroup = this.fb.group({
      questionId: '',
      order: max,
      name: '',
      answer: '',
    });
    return phoneGroup;
  }

  addQuestion() {
    this.securityQuestions.push(this.createQuestionGroup());
  }

  formGroupSections(index: number) {
    const formGroup = this.securityQuestions.controls[index] as FormGroup;
    return formGroup;
  }

  formArrayFieldIsInvalid(i: any, field: string) {
    return this.formGroupSections(i).controls[field].errors
      && (this.formGroupSections(i).controls[field].dirty || this.formGroupSections(i).controls[field].touched);
  }

  deleteQuestionSection(index: number): void {
    this.securityQuestions.removeAt(index)
    /*this.sections.value[index]['status'] = 'I';
    this.sections.value[index]['isHidden'] = true;

    this.valRegistryForm.markAsDirty();
    this.valRegistryForm.markAsTouched();
    if (this.valRegistryForm.valid) {
      this.errorMessage = '';
    }*/
  }

  get hasCategories(): boolean {
    return this.formAccount.controls['categories'].value && true;
  }

  get firstCategoryValue(): string{
    return (this.formAccount.controls['categories'].value.length > 0 && this.formAccount.controls['categories'].value?.[0].description)
    || '';
  }

  createForm() {
  }

  onSubmit(post: any) {
    //this.post = post;
    this.save();
  }

  save(): void {
    if (this.formAccount.valid) {
      if (this.formAccount.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const validationRegistry = { ...this.registry, ...this.formAccount.value };
        console.log(validationRegistry);
        this.accountsService.saveContact(validationRegistry).subscribe({
          next: () => this.router.navigate(['/accounts'])
        });
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
    this.formAccount.reset();
  }
}
