import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // here we setup a subscription when parameters are changed
    // this is needed when component is not recreated but route
    // parameters are changed
    this.paramsSubscription = this.route.params
      .subscribe(
        // this is an arrow function (anonimous function or lambda)
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
    // angular destroys this subscription - angular cleans this
    // subscription whenever this component is destroyed.
    // Anyways if you need to do some cleanup whenever the component
    // is destroyed this can be handled in ngOnDestroy.
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
