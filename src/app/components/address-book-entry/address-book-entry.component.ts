import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Contact } from '../../model/contact';
import { AddressProviderService } from
  '../../model/address-provider.service';
import { CONTACTS } from 'src/app/model/mock-data';


@Component({
  selector: 'app-address-book-entry',
  templateUrl: './address-book-entry.component.html',
  styleUrls: ['./address-book-entry.component.css']
})
export class AddressBookEntryComponent implements
  OnInit, OnDestroy {

  friend: Contact;
  sub: any;
  totalContacts: number;
  contacts: Contact[]
  index: number
  prev: Contact
  next: Contact
  constructor(private route: ActivatedRoute,
    private provider: AddressProviderService, private router: Router) { }

  ngOnInit() {
    this.contacts = this.provider.getFriends()
    

    this.sub =
      this.route.params.subscribe(params => {

        let id: string = params['id'];
        this.friend = this.provider.getFriend(+id);
        // set indexes for next/prev links
        this.index = this.contacts.indexOf(this.friend)
        this.prev = this.contacts[this.index - 1]
        this.next = this.contacts[this.index + 1]
        this.totalContacts = this.contacts.length;
        

      });

  }

  delete() {
    let confirm = window.confirm('Are you sure?')
    if (confirm) {
      


      this.contacts = this.provider.deleteFriend(this.friend.id)
      // update index of current friend before routing to it
      if (this.next) {
        this.friend = this.next
      } else {
        this.friend = this.prev
      }
      this.router.navigate([`/details/${this.friend.id}`])


    }

  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.sub.unsubscribe();
  }
}

























