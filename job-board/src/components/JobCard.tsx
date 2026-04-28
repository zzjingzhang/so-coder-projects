import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn,
  AttachMoney,
  Business,
  AccessTime,
  BookmarkBorder,
  Bookmark,
} from '@mui/icons-material';
import type { Job } from '../types';
import { jobTypeMap } from '../data/mockData';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  const getJobTypeColor = (type: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' => {
    const colorMap: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
      'full-time': 'success',
      'part-time': 'warning',
      'contract': 'primary',
      'remote': 'secondary',
      'internship': 'error',
    };
    return colorMap[type] || 'default';
  };

  const formatSalary = () => {
    const { min, max, currency, period } = job.salary;
    const periodLabel = period === 'monthly' ? '月' : '年';
    if (max) {
      return `${currency}${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k / ${periodLabel}`;
    }
    return `${currency}${(min / 1000).toFixed(0)}k+ / ${periodLabel}`;
  };

  const getDaysAgo = () => {
    const posted = new Date(job.postedDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    return `${diffDays} 天前`;
  };

  return (
    <Card
      className="h-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
      sx={{
        borderRadius: '12px',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent className="flex-grow p-6">
        <Box className="flex items-start justify-between mb-4">
          <Box className="flex items-center gap-4">
            <Avatar
              src={job.companyLogo}
              alt={job.company}
              sx={{
                width: 56,
                height: 56,
                borderRadius: '12px',
                border: '2px solid #f0f0f0',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                className="font-bold text-gray-900 mb-1 line-clamp-1"
                sx={{ fontSize: '1.1rem' }}
              >
                {job.title}
              </Typography>
              <Box className="flex items-center gap-2">
                <Business sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography variant="body2" className="text-gray-600">
                  {job.company}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Tooltip title={isBookmarked ? '取消收藏' : '收藏职位'}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle?.(job.id);
              }}
              sx={{
                color: isBookmarked ? '#f59e0b' : '#9ca3af',
              }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box className="flex flex-wrap gap-2 mb-4">
          <Chip
            label={jobTypeMap[job.jobType] || job.jobType}
            size="small"
            color={getJobTypeColor(job.jobType)}
            variant="outlined"
          />
          <Chip
            label={job.industry}
            size="small"
            variant="outlined"
            sx={{ borderColor: '#e5e7eb', color: '#6b7280' }}
          />
        </Box>

        <Box className="space-y-2 mb-4">
          <Box className="flex items-center gap-2 text-gray-600">
            <LocationOn sx={{ fontSize: 18 }} />
            <Typography variant="body2">{job.location}</Typography>
          </Box>
          <Box className="flex items-center gap-2 text-gray-600">
            <AttachMoney sx={{ fontSize: 18 }} />
            <Typography variant="body2" className="font-semibold text-green-600">
              {formatSalary()}
            </Typography>
          </Box>
          <Box className="flex items-center gap-2 text-gray-600">
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2">{getDaysAgo()}</Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          className="text-gray-600 line-clamp-2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.description}
        </Typography>
      </CardContent>

      <CardActions className="p-6 pt-0">
        <Button
          fullWidth
          variant="contained"
          onClick={() => onViewDetails(job)}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '0.95rem',
            py: 1.2,
          }}
        >
          查看详情
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
