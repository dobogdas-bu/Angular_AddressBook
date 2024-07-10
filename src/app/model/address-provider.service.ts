import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AddressProviderService {
contacts :Contact[]
  constructor() { }

  getFriends(): Contact[] {
	if(!this.contacts){
		this.contacts= CONTACTS
	}
	
  	return this.contacts;
  }

  getFriend(id: number): Contact {
  	
    let friend: Contact = this.contacts.find(
    		f => {return (f.id == id)});
    return friend;
  }

  addFriend(): Contact {
  	
  	let maxId: number;
  	
  	if (this.contacts && this.contacts.length > 0) {
  		maxId = this.contacts[this.contacts.length - 1].id;	
  	} else {
  		maxId = 0;
  	}

  	let friend: Contact = new Contact();
  	friend.id = maxId + 1;
  	
  	return friend;
  }


  deleteFriend(id: number):Contact[]{
	this.contacts =this.contacts.filter((friend)=>{return friend.id != id})

	return this.contacts
  }

}
