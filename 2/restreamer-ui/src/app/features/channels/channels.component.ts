import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

interface Channel {
  id: string;
  name: string;
  description: string;
  sourceUrl: string;
  destinationUrl: string;
  status: 'online' | 'offline' | 'active' | 'inactive';
  thumbnail: string;
  viewers: number;
  bitrate: string;
  resolution: string;
  fps: number;
  createdAt: Date;
}

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
  standalone: false
})
export class ChannelsComponent implements OnInit {
  channels: Channel[] = [];
  loading: boolean = true;
  showCreateDialog: boolean = false;
  showEditDialog: boolean = false;
  selectedChannel: Channel | null = null;
  channelForm: FormGroup;
  searchQuery: string = '';
  filteredChannels: Channel[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.channelForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      sourceUrl: ['', [Validators.required]],
      destinationUrl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadChannels();
  }

  private loadChannels(): void {
    setTimeout(() => {
      this.channels = [
        {
          id: '1',
          name: 'Main Stream',
          description: 'Primary live stream for events',
          sourceUrl: 'rtmp://source.example.com/live/stream1',
          destinationUrl: 'rtmp://destination.example.com/live/stream1',
          status: 'online',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=live%20streaming%20main%20broadcast%20camera%20recording&image_size=square',
          viewers: 847,
          bitrate: '4.5 Mbps',
          resolution: '1080p',
          fps: 30,
          createdAt: new Date('2024-01-15')
        },
        {
          id: '2',
          name: 'Backup Stream',
          description: 'Secondary backup stream',
          sourceUrl: 'rtmp://source.example.com/live/stream2',
          destinationUrl: 'rtmp://destination.example.com/live/stream2',
          status: 'active',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=backup%20video%20stream%20redundant%20server&image_size=square',
          viewers: 234,
          bitrate: '2.5 Mbps',
          resolution: '720p',
          fps: 30,
          createdAt: new Date('2024-02-01')
        },
        {
          id: '3',
          name: 'Test Channel',
          description: 'Testing environment channel',
          sourceUrl: 'rtmp://source.example.com/live/test',
          destinationUrl: 'rtmp://destination.example.com/live/test',
          status: 'offline',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=test%20broadcast%20video%20testing%20setup&image_size=square',
          viewers: 0,
          bitrate: '0 Mbps',
          resolution: '480p',
          fps: 30,
          createdAt: new Date('2024-03-10')
        }
      ];
      this.filteredChannels = [...this.channels];
      this.loading = false;
    }, 500);
  }

  searchChannels(): void {
    if (!this.searchQuery.trim()) {
      this.filteredChannels = [...this.channels];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredChannels = this.channels.filter(channel => 
      channel.name.toLowerCase().includes(query) ||
      channel.description.toLowerCase().includes(query)
    );
  }

  openCreateDialog(): void {
    this.channelForm.reset();
    this.showCreateDialog = true;
  }

  openEditDialog(channel: Channel): void {
    this.selectedChannel = channel;
    this.channelForm.patchValue({
      name: channel.name,
      description: channel.description,
      sourceUrl: channel.sourceUrl,
      destinationUrl: channel.destinationUrl
    });
    this.showEditDialog = true;
  }

  closeDialogs(): void {
    this.showCreateDialog = false;
    this.showEditDialog = false;
    this.selectedChannel = null;
  }

  saveChannel(): void {
    if (this.channelForm.invalid) {
      this.channelForm.markAllAsTouched();
      return;
    }

    const formValue = this.channelForm.value;

    if (this.showCreateDialog) {
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: formValue.name,
        description: formValue.description,
        sourceUrl: formValue.sourceUrl,
        destinationUrl: formValue.destinationUrl,
        status: 'inactive',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=new%20video%20channel%20placeholder&image_size=square',
        viewers: 0,
        bitrate: '0 Mbps',
        resolution: '1080p',
        fps: 30,
        createdAt: new Date()
      };
      
      this.channels.unshift(newChannel);
      this.filteredChannels = [...this.channels];
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Channel created successfully'
      });
    } else if (this.selectedChannel) {
      const index = this.channels.findIndex((c: Channel) => c.id === this.selectedChannel!.id);
      if (index !== -1) {
        this.channels[index] = {
          ...this.channels[index],
          name: formValue.name,
          description: formValue.description,
          sourceUrl: formValue.sourceUrl,
          destinationUrl: formValue.destinationUrl
        };
        this.filteredChannels = [...this.channels];
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Channel updated successfully'
        });
      }
    }

    this.closeDialogs();
  }

  confirmDelete(channel: Channel): void {
    this.confirmationService.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this channel?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteChannel(channel);
      }
    });
  }

  deleteChannel(channel: Channel): void {
    const index = this.channels.findIndex((c: Channel) => c.id === channel.id);
    if (index !== -1) {
      this.channels.splice(index, 1);
      this.filteredChannels = [...this.channels];
      this.messageService.add({
        severity: 'info',
        summary: 'Deleted',
        detail: 'Channel deleted successfully'
      });
    }
  }

  toggleChannelStatus(channel: Channel): void {
    channel.status = channel.status === 'online' ? 'offline' : 'online';
    this.messageService.add({
      severity: 'info',
      summary: 'Status Changed',
      detail: `Channel is now ${channel.status}`
    });
  }

  getStatusBadgeSeverity(status: string): 'success' | 'danger' | 'info' | 'secondary' | 'warn' {
    switch (status) {
      case 'online':
      case 'active':
        return 'success';
      case 'offline':
        return 'danger';
      case 'inactive':
        return 'secondary';
      case 'warning':
        return 'warn';
      default:
        return 'info';
    }
  }
}
