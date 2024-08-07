import { Pipe, PipeTransform } from '@angular/core';

interface Address {
  streetAddress: string;
  zipcode: string;
  city: string;
  state: string;
}

@Pipe({
  name: 'addressPipe',
})
export class AddressPipe implements PipeTransform {
  transform(address: Address): string {
    if (!address) return '';

    const { streetAddress, city, state, zipcode } = address;

    return `${streetAddress}, ${city}, ${state} ${zipcode}`;
  }
}
