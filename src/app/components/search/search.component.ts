import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query = new FormControl('', Validators.required);
  @Input() initialValue = '';
  @Output() userQuery: EventEmitter<string> = new EventEmitter<string>();
  @Input() loading = false;

  constructor() {}

  ngOnInit() {
    this.query.setValue(this.initialValue);
  }

  search(event: Event) {
    event.preventDefault();
    if (this.query.valid) {
      this.userQuery.emit(this.query.value as string);
    }
  }
}
