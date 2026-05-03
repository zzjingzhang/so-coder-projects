import React, { useRef, useState, useEffect } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  Fullscreen,
} from '@mui/icons-material';

interface VideoPlayerProps {
  videoUrl: string;
  filterString: string;
  onVideoSelect?: (url: string) => void;
  sampleVideos: string[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  filterString,
  sampleVideos,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePrevVideo = () => {
    const newIndex = (currentVideoIndex - 1 + sampleVideos.length) % sampleVideos.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleNextVideo = () => {
    const newIndex = (currentVideoIndex + 1) % sampleVideos.length;
    setCurrentVideoIndex(newIndex);
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  return (
    <Box
      ref={containerRef}
      className="relative rounded-xl overflow-hidden shadow-2xl bg-black"
      sx={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
    >
      <video
        ref={videoRef}
        src={sampleVideos[currentVideoIndex]}
        className="w-full h-auto"
        style={{ filter: filterString }}
        onClick={togglePlay}
        playsInline
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white text-sm min-w-[80px] text-center">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 accent-blue-500 cursor-pointer"
          />
          <span className="text-white text-sm min-w-[80px] text-center">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tooltip title="上一个">
              <IconButton
                onClick={handlePrevVideo}
                sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <SkipPrevious />
              </IconButton>
            </Tooltip>

            <Tooltip title={isPlaying ? '暂停' : '播放'}>
              <IconButton
                onClick={togglePlay}
                sx={{
                  color: 'white',
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  width: 48,
                  height: 48,
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>

            <Tooltip title="下一个">
              <IconButton
                onClick={handleNextVideo}
                sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <SkipNext />
              </IconButton>
            </Tooltip>

            <div className="flex items-center gap-2 ml-2">
              <IconButton
                onClick={toggleMute}
                sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip title="全屏">
              <IconButton
                onClick={handleFullscreen}
                sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <PlayArrow sx={{ fontSize: 48, color: 'white' }} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default VideoPlayer;
