import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientModel } from '../../recipes/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnChanges {
  editForm: FormGroup;

  @Input() selectedIg: IngredientModel;
  @Output() clearSelected: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private slService: ShoppingListService) {
  }

  ngOnChanges(): void {
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      name: [this.selectedIg ? this.selectedIg.name : null, Validators.required],
      amount: [this.selectedIg ? this.selectedIg.amount : null, Validators.required]
    });
  }

  add() {
    if (this.editForm.valid) {
      const newIngredient = {name: this.editForm.get('name').value, amount: this.editForm.get('amount').value};
      this.slService.add(newIngredient);
      this.editForm.reset();
    }
  }

  update() {
    this.slService.update(this.selectedIg);
    this.editForm.reset();
  }

  delete() {
    if (this.selectedIg) {
      this.slService.delete(this.selectedIg);
      this.editForm.reset();
      this.selectedIg = null;
    }
  }

  clearForm() {
    this.clearSelected.emit();
    this.editForm.reset();
    this.selectedIg = null;
  }
}
