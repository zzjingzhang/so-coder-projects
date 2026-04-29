import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../types/music';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  constructor(private http: HttpClient) {}

  getPlaylist(): Observable<Song[]> {
    return this.http.get<Song[]>('/music/music-data.json');
  }
}
