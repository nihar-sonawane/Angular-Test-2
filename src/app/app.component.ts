import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Angular Test Two';
  myControl = new FormControl();
  Firstname = '';
  Lastname = '';
  genderUser: string;
  genders: string[] = ['Male', 'Female'];
  milesrun = 0;
  options: User[] = [
    { name: 'Main Building' },
    { name: 'SVC' },
    { name: 'Roush Building' },
    { name: 'CCD Building' },
    { name: 'Pasta Street' }
  ];
  
  filteredOptions: Observable<User[]>;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  formatLabel(value: number) {
    this.milesrun = value
    return value;
  }

  onSubmit() {
    console.log("It's working!"); 
    console.log(this.Firstname);
    console.log(this.Lastname);
    console.log(this.genderUser);
  }

}
