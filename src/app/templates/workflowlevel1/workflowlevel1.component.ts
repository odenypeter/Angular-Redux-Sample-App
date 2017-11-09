import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from 'app/common/interface/appstate';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-workflowlevel1',
  templateUrl: './workflowlevel1.component.html',
  styleUrls: ['./workflowlevel1.component.scss']
})
export class Workflowlevel1Component implements OnInit, OnDestroy {

  heroForm: FormGroup;
  public programs = [];
  public projects = [];

  private stores;
  private storeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {

    this.stores = Observable.combineLatest(
      this.store.select('workflowLevel1'),
      this.store.select('workflowLevel2'),
    );
    this.heroForm = this.fb.group({
      name: ['', Validators.required ],
      start_date: [''],
      end_date: ['']
    });
  }

  ngOnInit() {
    this.storeSubscription = this.stores.subscribe((data) => {
      this.programs = data[0];
      this.projects = data[1];

      console.log(this.programs);
      console.log(this.projects);
    });
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

}
