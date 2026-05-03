import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Divider } from '@mui/material';
import type { FilterState } from '../types/filter';
import { getDefaultFilterState } from '../types/filter';
import { generateFilterString } from '../utils/filterUtils';
import VideoPlayer from '../components/VideoPlayer';
import FilterPanel from '../components/FilterPanel';
import PresetFilters from '../components/PresetFilters';

const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
];

const HomePage: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>(getDefaultFilterState());

  const handleFilterChange = (filterId: string, value: number) => {
    setFilterState((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleReset = () => {
    setFilterState(getDefaultFilterState());
  };

  const handlePresetSelect = (filters: FilterState) => {
    setFilterState(filters);
  };

  const filterString = generateFilterString(filterState);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        pb: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 3,
          mb: 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                🎬
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                视频滤镜播放器
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                实时切换多种滤镜效果，自由调节强度
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={3}
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <VideoPlayer
              videoUrl={SAMPLE_VIDEOS[0]}
              filterString={filterString}
              sampleVideos={SAMPLE_VIDEOS}
            />

            <Box mt={3}>
              <PresetFilters
                onPresetSelect={handlePresetSelect}
                currentFilters={filterState}
              />
            </Box>

            <Box mt={3}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
                  当前滤镜效果
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  filter: {filterString || 'none'};
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', lg: 360 },
              flexShrink: 0,
            }}
          >
            <FilterPanel
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />

            <Box mt={3}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
                  使用说明
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      🎮 播放控制
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      点击视频或播放按钮播放/暂停，拖动进度条跳转，支持音量调节和全屏播放
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      🎨 滤镜调节
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      拖动滑块实时调整滤镜强度，点击重置按钮恢复默认设置
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      ⚡ 预设效果
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      一键应用预设滤镜组合，快速切换不同风格
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
