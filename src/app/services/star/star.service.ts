import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  getFilledStars(rating: number, index: number): boolean {
    const value = rating - (2 * index);
    const star = value >= 0;
    return star;
  }

  getHalfStars(rating: number, index: number): boolean {
    const value = rating - (2 * index);
    const star = value >= 1 && value < 2;
    return star;
  }

  getEmptyStars(rating: number, index: number): boolean {
    const value = (2 * index) - rating;
    const star = value >= 1;
    return star;
  }
}
