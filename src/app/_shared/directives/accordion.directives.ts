import {Component, Input} from '@angular/core'
import {Gigs} from "../../interfaces/gigs";

@Component({
  selector: '[accordion]',
  template: `<table cellpadding="0" cellspacing="0" class="tbl-accordion-nested">
        <thead (click)="openAccordion()">
        <tr class="job">
          <td class="new"><span *ngIf="(gig.date.$date | DateDifference) < 24">new</span></td>
          <td class="job-number">{{ gig.index | lpad: 3 }}</td>
          <td class="job-title"><span [outerHTML]="gig.experience | highlightSearchKeyword: searchKeyword"></span> 
          <span [outerHTML]="gig.role | highlightSearchKeyword: searchKeyword"></span>, 
          <span [outerHTML]="gig.technology | highlightSearchKeyword: searchKeyword"></span>, 
          <span [outerHTML]="gig.type_of_job | highlightSearchKeyword: searchKeyword"></span></td>
          <td class="job-date">{{ gig.date.$date | amTimeAgo }}</td>
        </tr>
        </thead></table>

        <table *ngIf="openDropDown">
          <tbody>
          <tr>
            <td class="new"></td>
            <td class="job-number"></td>
            <td colspan="8" class="job-summary">
            <span [outerHTML]="gig.extra | highlightSearchKeyword: searchKeyword"></span>
            </td>
            <td></td>
          </tr>

          <tr>
            <td class="new"></td>
            <td class="job-number"></td>
            <td class="pay">Pay: {{ gig.price_range }}</td>
            <td></td>
          </tr>

          <tr>
            <td class="new"></td>
            <td class="job-number"></td>
            <td class="job-action">
            <a [attr.href]="'https://' + gig.team.team.domain + '.slack.com/messages/' + gig.user.user.id" target="_blank">Send a Direct Message</a> 
            
            <!--<a [attr.href]="'mailto:' + gig.user.user.profile.email + ' ?subject=Application for a ' + gig.experience + ' ' + gig.role + ', ' + gig.technology + ', ' + gig.type_of_job">Send an Email</a> <a-->
              <!--href="">Share</a>-->
            </td>
          </tr>
          </tbody>
        </table>`
})

export class Accordion {
  @Input() gig: Gigs = null;
  @Input() searchKeyword: string = null;
  openDropDown: Boolean = false;

  constructor() {
  }

  openAccordion() {
    this.openDropDown = !this.openDropDown;
  }
}
