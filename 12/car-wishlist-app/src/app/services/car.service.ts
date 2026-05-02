import { Injectable, signal } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars = signal<Car[]>([
    {
      id: '1',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2024,
      price: 269900,
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleek%20white%20Tesla%20Model%203%20electric%20sedan%20studio%20shot&image_size=square_hd',
      createdAt: new Date()
    },
    {
      id: '2',
      brand: 'BMW',
      model: 'M4 Competition',
      year: 2024,
      price: 893900,
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20BMW%20M4%20Competition%20sports%20car%20studio%20shot&image_size=square_hd',
      createdAt: new Date()
    }
  ]);

  getCars() {
    return this.cars();
  }

  addCar(car: Omit<Car, 'id' | 'createdAt'>) {
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.cars.update(cars => [...cars, newCar]);
  }

  removeCar(id: string) {
    this.cars.update(cars => cars.filter(car => car.id !== id));
  }
}
