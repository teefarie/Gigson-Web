import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {GigsService} from "../_shared/services/gigs.service";
import {isUndefined} from "util";
import {Observable} from "rxjs";
import {Gigs} from "../interfaces/gigs";

@Component({
  selector: 'home',
  templateUrl: 'home.html',
})


export class Home implements OnInit {
  nothingFound: boolean = false;
  searchingKeyword: String = "";
  showProgrammingGigs: Gigs[] = [];
  hideProgrammingGigs: Gigs[] = [];
  lastProgrammingGig: Gigs = null;
  showMoreProgrammingGig: Boolean = false;

  showDesignGigs: Gigs[] = [];
  hideDesignGigs: Gigs[] = [];
  lastDesignGig: Gigs = null;
  showMoreDesignGig: Boolean = false;

  keyUps: Observable<any>;
  selected: number[] = [];
  numberOfShownGigs: number = 10;

  @ViewChild('search') searchElRef: ElementRef;

  shouldStick = false;

  constructor(private _gigsService: GigsService) {
  }

  ngOnInit() {
    this._gigsService.fetchAll().subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this.treatGigs(response);
        }
      }
    }, (err) => {
      // Catch Error
    });


    this.searchOnKeyUp(this.searchElRef);
    this.keyUps.subscribe(data => this.search(data));
  };


  searchOnKeyUp(searchElRef) {
    this.keyUps = Observable.fromEvent(searchElRef.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter(text => text.length >= 3 || text.trim() == '')
      .debounceTime(800)
      .distinctUntilChanged();

    this.keyUps.subscribe(() => {
      this.selected = [];
    })
  }

  search(data) {
    this._gigsService.search(data).subscribe(response => {
      this.searchingKeyword = null;
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this.searchingKeyword = data;
          this.treatGigs(response);
        }
      }
    }, (err) => {
      // Catch Error
    });
  }

  treatGigs(response) {
    this.showProgrammingGigs = [];
    this.hideProgrammingGigs = [];
    this.lastProgrammingGig = null;
    this.showMoreProgrammingGig = false;

    this.showDesignGigs = [];
    this.hideDesignGigs = [];
    this.lastDesignGig = null;
    this.showMoreDesignGig = false;

    if (response.extras.gigs.programming_gigs != null && response.extras.gigs.programming_gigs.length > 0) {
      this.nothingFound = false;
      let counter: number = 0;
      this.lastProgrammingGig = response.extras.gigs.programming_gigs[0];
      if (response.extras.gigs.programming_gigs.length > this.numberOfShownGigs) {
        for (let i = 0; i < this.numberOfShownGigs; i++) {
          counter++;
          response.extras.gigs.programming_gigs[i].index = counter;
          this.showProgrammingGigs.push(response.extras.gigs.programming_gigs[i])
        }

        for (let i = this.numberOfShownGigs; i < response.extras.gigs.programming_gigs.length; i++) {
          counter++;
          response.extras.gigs.programming_gigs[i].index = counter;
          this.hideProgrammingGigs.push(response.extras.gigs.programming_gigs[i])
        }
      } else {
        for (let i = 0; i < response.extras.gigs.programming_gigs.length; i++) {
          counter++;
          response.extras.gigs.programming_gigs[i].index = counter;
          this.showProgrammingGigs.push(response.extras.gigs.programming_gigs[i])
        }
      }
    } else {
      this.nothingFound = true;
    }

    if (response.extras.gigs.design_gigs != null && response.extras.gigs.design_gigs.length > 0) {
      let counter: number = 0;
      this.lastDesignGig = response.extras.gigs.design_gigs[0];
      if (response.extras.gigs.design_gigs.length > this.numberOfShownGigs) {
        for (let i = 0; i < this.numberOfShownGigs; i++) {
          counter++;
          response.extras.gigs.design_gigs[i].index = counter;
          this.showDesignGigs.push(response.extras.gigs.design_gigs[i])
        }

        for (let i = this.numberOfShownGigs; i < response.extras.gigs.design_gigs.length; i++) {
          counter++;
          response.extras.gigs.design_gigs[i].index = counter;
          this.hideDesignGigs.push(response.extras.gigs.design_gigs[i])
        }
      } else {
        for (let i = 0; i < response.extras.gigs.design_gigs.length; i++) {
          counter++;
          response.extras.gigs.design_gigs[i].index = counter;
          this.showDesignGigs.push(response.extras.gigs.design_gigs[i])
        }
      }
    }
  }

  toggleProgrammingShowMore() {
    this.showMoreProgrammingGig = !this.showMoreProgrammingGig;
  }

  toggleDesignShowMore() {
    this.showMoreDesignGig = !this.showMoreDesignGig;
  }
}
