import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    { provide: DateAdapter, useClass: NativeDateAdapter }
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('calendarSlide', [
      state('closed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: 1, overflow: 'visible' })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class BookingComponent implements OnInit {
  room: Room | undefined;
  loading = true;
  bookingForm: FormGroup;
  calendarOpen = false;
  minDate: Date;
  selectedDate: Date | null = null;
  timeSlots: string[] = [];
  bookedSlots: string[] = ['09:00', '10:00', '14:00'];
  selectedSlots: string[] = [];
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.minDate = new Date();
    this.bookingForm = this.fb.group({
      date: [null, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      attendees: [1, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      notes: ['']
    });

    this.generateTimeSlots();
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.roomService.getRoomById(+roomId).subscribe({
        next: (room) => {
          this.room = room;
          this.loading = false;
          if (room) {
            this.bookingForm.get('attendees')?.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(room.capacity)
            ]);
          }
        },
        error: (err) => {
          console.error('加载房间数据失败:', err);
          this.loading = false;
        }
      });
    } else {
      console.error('未找到房间ID');
      this.loading = false;
    }
    
    setTimeout(() => {
      if (this.loading) {
        console.log('加载超时，强制显示内容');
        this.loading = false;
      }
    }, 2000);
  }

  generateTimeSlots(): void {
    this.timeSlots = [];
    for (let hour = 8; hour <= 21; hour++) {
      this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 21) {
        this.timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
  }

  toggleCalendar(): void {
    this.calendarOpen = !this.calendarOpen;
  }

  onDateSelected(event: any): void {
    this.selectedDate = event.value;
    this.bookingForm.get('date')?.setValue(event.value);
    this.calendarOpen = false;
    this.simulateBookedSlots();
  }

  simulateBookedSlots(): void {
    this.bookedSlots = [];
    const randomCount = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < randomCount; i++) {
      const hour = Math.floor(Math.random() * 12) + 9;
      const minute = Math.random() > 0.5 ? '00' : '30';
      this.bookedSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
    }
  }

  isSlotBooked(slot: string): boolean {
    return this.bookedSlots.includes(slot);
  }

  isSlotAvailable(slot: string): boolean {
    return !this.isSlotBooked(slot);
  }

  getSlotStatus(slot: string): string {
    if (this.selectedSlots.includes(slot)) {
      return 'bg-blue-500 text-white';
    } else if (this.isSlotBooked(slot)) {
      return 'bg-red-100 text-red-400 cursor-not-allowed';
    }
    return 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer';
  }

  toggleSlot(slot: string): void {
    if (this.isSlotBooked(slot)) {
      return;
    }
    
    const index = this.selectedSlots.indexOf(slot);
    if (index > -1) {
      this.selectedSlots.splice(index, 1);
    } else {
      this.selectedSlots.push(slot);
      this.selectedSlots.sort();
    }
    
    if (this.selectedSlots.length > 0) {
      this.bookingForm.get('startTime')?.setValue(this.selectedSlots[0]);
      this.bookingForm.get('endTime')?.setValue(this.selectedSlots[this.selectedSlots.length - 1]);
    } else {
      this.bookingForm.get('startTime')?.setValue('');
      this.bookingForm.get('endTime')?.setValue('');
    }
  }

  calculateTotal(): number {
    if (!this.room || this.selectedSlots.length === 0) {
      return 0;
    }
    const hours = this.selectedSlots.length * 0.5;
    return Math.round(this.room.pricePerHour * hours);
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.selectedSlots.length > 0) {
      this.showSuccess = true;
      this.snackBar.open('预订成功！确认邮件已发送至您的邮箱。', '关闭', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    } else {
      this.snackBar.open('请填写所有必填项并选择时间段', '关闭', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getRoomTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'meeting': '会议室',
      'private': '私密办公室',
      'open': '开放空间'
    };
    return labels[type] || type;
  }

  getAttendeeOptions(): number[] {
    if (!this.room) return [1];
    return Array.from({ length: this.room.capacity }, (_, i) => i + 1);
  }
}
