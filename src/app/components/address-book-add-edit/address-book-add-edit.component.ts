import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CONTACTS } from 'src/app/model/mock-data';
import { Contact } from '../../model/contact';
import { AddressProviderService } from
  '../../model/address-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-book-add-edit',
  templateUrl: './address-book-add-edit.component.html',
  styleUrls: ['./address-book-add-edit.component.css']
})
export class AddressBookAddEditComponent implements OnInit {
  
  friend: Contact;
  title: string;
  friends: Contact[]
  original: Contact // save original state to revert if Edit is cancelled
  constructor(private route: ActivatedRoute,
    private provider: AddressProviderService, private router: Router) { }

  ngOnInit() {
    this.friends = this.provider.getFriends()
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.title = 'Edit Contact';      
      this.friend = this.provider.getFriend(id);
      // create deep copy.. there are no nested properties or functions so this works
      this.original = JSON.parse(JSON.stringify(this.friend))

    } else {
      this.title = "Add Contact";
      this.friend = this.provider.addFriend();
    }

  }

  // save friend
  save() {
    if (this.friend.name && this.friend.address && this.friend.phone) {
      let confirm = window.confirm("Are you sure")

      if (confirm) {
        // if new contact, push to contacts
        if (this.title === 'Add Contact') {
          this.friends.push(this.friend)
        }

        // route to View screen
        this.router.navigate([`/details/${this.friend.id}`])
      }
    }
  }
  cancel() {    
    
      if (this.title === 'Add Contact') {
        this.router.navigate([''])
      } else {        
        this.friend.name = this.original.name
        this.friend.address= this.original.address
        this.friend.phone = this.original.phone
        this.router.navigate([`/details/${this.friend.id}`])
      }
    
  }





}
