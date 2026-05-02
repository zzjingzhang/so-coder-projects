import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CarService } from './services/car.service';
import { Car } from './models/car.model';
import { AddCarModalComponent } from './components/add-car-modal/add-car-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  cars = signal<Car[]>([]);

  constructor(
    private carService: CarService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {
    this.cars.set(this.carService.getCars());
  }

  openAddModal(): void {
    const modalRef = this.modal.create({
      nzTitle: '添加汽车',
      nzContent: AddCarModalComponent,
      nzWidth: '500px',
      nzFooter: [
        {
          label: '取消',
          onClick: () => modalRef.close()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: () => {
            const componentInstance = modalRef.getContentComponent() as AddCarModalComponent;
            componentInstance.handleOk();
          }
        }
      ]
    });

    modalRef.afterClose.subscribe((result: any) => {
      if (result) {
        const imageUrl = result.imageUrl || this.getDefaultImage(result.brand);
        this.carService.addCar({
          brand: result.brand,
          model: result.model,
          year: result.year,
          price: result.price,
          imageUrl: imageUrl
        });
        this.cars.set(this.carService.getCars());
        this.message.success('汽车添加成功！');
      }
    });
  }

  getDefaultImage(brand: string): string {
    const prompts: Record<string, string> = {
      'Tesla': 'white%20Tesla%20electric%20car%20studio%20shot',
      'BMW': 'black%20BMW%20luxury%20sports%20car%20studio%20shot',
      'Mercedes-Benz': 'silver%20Mercedes%20Benz%20luxury%20sedan%20studio%20shot',
      'Audi': 'gray%20Audi%20luxury%20car%20studio%20shot',
      'Porsche': 'red%20Porsche%20911%20sports%20car%20studio%20shot',
      'Toyota': 'blue%20Toyota%20reliable%20car%20studio%20shot',
      'Honda': 'white%20Honda%20compact%20car%20studio%20shot',
      'Ford': 'black%20Ford%20American%20muscle%20car%20studio%20shot',
      'Lexus': 'dark%20blue%20Lexus%20premium%20luxury%20car%20studio%20shot',
      'Maserati': 'red%20Maserati%20luxury%20sports%20car%20studio%20shot',
      'Lamborghini': 'yellow%20Lamborghini%20supercar%20studio%20shot',
      'Ferrari': 'red%20Ferrari%20supercar%20studio%20shot',
      '其他': 'sleek%20modern%20luxury%20car%20studio%20shot'
    };
    const prompt = prompts[brand] || prompts['其他'];
    return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square_hd`;
  }

  deleteCar(car: Car): void {
    this.modal.confirm({
      nzTitle: '确认删除',
      nzContent: `确定要删除「${car.brand} ${car.model}」吗？`,
      nzOkText: '删除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: '取消',
      nzOnOk: () => {
        this.carService.removeCar(car.id);
        this.cars.set(this.carService.getCars());
        this.message.success('已删除');
      }
    });
  }

  formatPrice(price: number): string {
    if (price >= 10000) {
      return (price / 10000).toFixed(0) + '万';
    }
    return price.toLocaleString();
  }

  priceFormatter = (value: number): string => {
    if (!value && value !== 0) {
      return '';
    }
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
}
