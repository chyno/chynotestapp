import { inject } from 'aurelia-framework';
import { User } from './user';

@inject(User)
export class Welcome {
  constructor(User) {
    this.user = User;
    }
}
