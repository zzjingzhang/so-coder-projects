import type { Track, Playlist, User } from '../types'

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Alex Nova',
    album: 'Echoes of Night',
    cover: 'https://picsum.photos/seed/music1/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 234,
    likes: 12540,
    plays: 89320,
    genre: 'Electronic'
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Luna Wave',
    album: 'Tropical Vibes',
    cover: 'https://picsum.photos/seed/music2/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 198,
    likes: 8920,
    plays: 65430,
    genre: 'Chill'
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    artist: 'Street Beats',
    album: 'City Lights',
    cover: 'https://picsum.photos/seed/music3/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 215,
    likes: 15670,
    plays: 98230,
    genre: 'Hip Hop'
  },
  {
    id: '4',
    title: 'Acoustic Morning',
    artist: 'Sarah Johnson',
    album: 'Folk Tales',
    cover: 'https://picsum.photos/seed/music4/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 187,
    likes: 6540,
    plays: 43210,
    genre: 'Folk'
  },
  {
    id: '5',
    title: 'Neon Pulse',
    artist: 'Synth Master',
    album: 'Retro Future',
    cover: 'https://picsum.photos/seed/music5/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 245,
    likes: 21340,
    plays: 156780,
    genre: 'Synthwave'
  },
  {
    id: '6',
    title: 'Deep Ocean',
    artist: 'Blue Waves',
    album: 'Underwater World',
    cover: 'https://picsum.photos/seed/music6/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 209,
    likes: 9870,
    plays: 76540,
    genre: 'Deep House'
  },
  {
    id: '7',
    title: 'Rock Revolution',
    artist: 'Thunder Band',
    album: 'Electric Soul',
    cover: 'https://picsum.photos/seed/music7/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 228,
    likes: 18760,
    plays: 134560,
    genre: 'Rock'
  },
  {
    id: '8',
    title: 'Jazz Evening',
    artist: 'Moonlight Trio',
    album: 'Night Sessions',
    cover: 'https://picsum.photos/seed/music8/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 256,
    likes: 11230,
    plays: 87650,
    genre: 'Jazz'
  }
]

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Chill Vibes',
    cover: 'https://picsum.photos/seed/playlist1/300/300',
    tracks: mockTracks.slice(0, 4),
    description: 'Perfect tunes for relaxation and focus',
    owner: 'SoundWave'
  },
  {
    id: '2',
    title: 'Workout Energy',
    cover: 'https://picsum.photos/seed/playlist2/300/300',
    tracks: mockTracks.slice(2, 6),
    description: 'High energy beats to power your workout',
    owner: 'SoundWave'
  },
  {
    id: '3',
    title: 'Night Drive',
    cover: 'https://picsum.photos/seed/playlist3/300/300',
    tracks: mockTracks.slice(4, 8),
    description: 'Soundtrack for your late night adventures',
    owner: 'SoundWave'
  }
]

export const mockUser: User = {
  id: '1',
  name: 'Music Lover',
  avatar: 'https://picsum.photos/seed/useravatar/200/200',
  followers: 1234,
  following: 567
}
