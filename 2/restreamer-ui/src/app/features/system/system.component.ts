import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

interface SystemInfo {
  hostname: string;
  os: string;
  architecture: string;
  kernel: string;
  uptime: string;
  version: string;
}

interface CpuInfo {
  model: string;
  cores: number;
  threads: number;
  usage: number;
  loadAverage: number[];
  temperature: number;
}

interface MemoryInfo {
  total: string;
  used: string;
  free: string;
  buffers: string;
  cached: string;
  usage: number;
}

interface DiskInfo {
  name: string;
  mount: string;
  total: string;
  used: string;
  free: string;
  usage: number;
}

interface NetworkInfo {
  interfaces: {
    name: string;
    ip: string;
    mac: string;
    rxBytes: string;
    txBytes: string;
  }[];
  traffic: {
    in: string;
    out: string;
  };
}

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  standalone: false
})
export class SystemComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  systemInfo: SystemInfo | null = null;
  cpuInfo: CpuInfo | null = null;
  memoryInfo: MemoryInfo | null = null;
  diskInfo: DiskInfo[] = [];
  networkInfo: NetworkInfo | null = null;

  private metricsSubscription?: Subscription;

  ngOnInit(): void {
    this.loadSystemData();

    this.metricsSubscription = interval(3000).pipe(
      startWith(0)
    ).subscribe(() => {
      this.updateLiveMetrics();
    });
  }

  ngOnDestroy(): void {
    this.metricsSubscription?.unsubscribe();
  }

  private loadSystemData(): void {
    setTimeout(() => {
      this.systemInfo = {
        hostname: 'restreamer-server-01',
        os: 'Ubuntu 22.04.3 LTS',
        architecture: 'x86_64',
        kernel: '5.15.0-91-generic',
        uptime: this.formatUptime(123456),
        version: 'Restreamer v2.0.0'
      };

      this.cpuInfo = {
        model: 'Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz',
        cores: 8,
        threads: 16,
        usage: 45,
        loadAverage: [1.23, 1.45, 1.67],
        temperature: 58
      };

      this.memoryInfo = {
        total: '32 GB',
        used: '19.8 GB',
        free: '12.2 GB',
        usage: 62,
        buffers: '1.2 GB',
        cached: '5.8 GB'
      };

      this.diskInfo = [
        {
          name: '/dev/sda1',
          mount: '/',
          total: '500 GB',
          used: '170 GB',
          free: '330 GB',
          usage: 34
        },
        {
          name: '/dev/sdb1',
          mount: '/data',
          total: '2 TB',
          used: '800 GB',
          free: '1.2 TB',
          usage: 40
        }
      ];

      this.networkInfo = {
        interfaces: [
          {
            name: 'eth0',
            ip: '192.168.1.100',
            mac: '00:1A:2B:3C:4D:5E',
            rxBytes: '1.2 TB',
            txBytes: '890 GB'
          }
        ],
        traffic: {
          in: '125 Mbps',
          out: '45 Mbps'
        }
      };

      this.loading = false;
    }, 500);
  }

  private updateLiveMetrics(): void {
    if (this.cpuInfo) {
      this.cpuInfo.usage = Math.min(100, Math.max(10, this.cpuInfo.usage + (Math.random() * 20 - 10)));
      this.cpuInfo.temperature = Math.min(90, Math.max(40, this.cpuInfo.temperature + (Math.random() * 4 - 2)));
    }

    if (this.memoryInfo) {
      this.memoryInfo.usage = Math.min(90, Math.max(30, this.memoryInfo.usage + (Math.random() * 5 - 2.5)));
    }
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} days`);
    if (hours > 0) parts.push(`${hours} hours`);
    if (minutes > 0) parts.push(`${minutes} minutes`);

    return parts.join(', ');
  }

  getMetricSeverity(value: number): 'success' | 'warning' | 'danger' | 'info' {
    if (value >= 90) return 'danger';
    if (value >= 70) return 'warning';
    if (value >= 50) return 'info';
    return 'success';
  }

  getLoadAverage(index: number): string {
    if (this.cpuInfo && this.cpuInfo.loadAverage && this.cpuInfo.loadAverage[index] !== undefined) {
      return this.cpuInfo.loadAverage[index].toFixed(2);
    }
    return '0.00';
  }
}
