import type { Track, Playlist, User } from '../types'

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Alex Nova',
    album: 'Echoes of Night',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20electronic%20music%20album%20cover%20with%20neon%20lights%20and%20abstract%20shapes&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tropical%20beach%20music%20album%20cover%20with%20palm%20trees%20and%20sunset&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20hip%20hop%20music%20album%20cover%20with%20city%20skyline%20and%20graffiti&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=acoustic%20folk%20music%20album%20cover%20with%20guitar%20and%20nature%20scenery&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=synthwave%20retro%20music%20album%20cover%20with%20neon%20colors%20and%2080s%20aesthetic&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=deep%20house%20music%20album%20cover%20with%20ocean%20waves%20and%20bubbles&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rock%20music%20album%20cover%20with%20electric%20guitar%20and%20stage%20lights&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jazz%20music%20album%20cover%20with%20saxophone%20and%20dim%20cafe%20lights&image_size=square',
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chill%20music%20playlist%20cover%20with%20cozy%20cafe%20atmosphere&image_size=square',
    tracks: mockTracks.slice(0, 4),
    description: 'Perfect tunes for relaxation and focus',
    owner: 'SoundWave'
  },
  {
    id: '2',
    title: 'Workout Energy',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=workout%20music%20playlist%20cover%20with%20energetic%20gym%20scenery&image_size=square',
    tracks: mockTracks.slice(2, 6),
    description: 'High energy beats to power your workout',
    owner: 'SoundWave'
  },
  {
    id: '3',
    title: 'Night Drive',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=night%20drive%20music%20playlist%20cover%20with%20city%20lights%20and%20car&image_size=square',
    tracks: mockTracks.slice(4, 8),
    description: 'Soundtrack for your late night adventures',
    owner: 'SoundWave'
  }
]

export const mockUser: User = {
  id: '1',
  name: 'Music Lover',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20user%20avatar%20with%20headphones%20and%20music%20theme&image_size=square',
  followers: 1234,
  following: 567
}
