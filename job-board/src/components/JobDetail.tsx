import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Close,
  LocationOn,
  AttachMoney,
  Business,
  AccessTime,
  CheckCircle,
  Star,
  Work,
  People,
} from '@mui/icons-material';
import type { Job } from '../types';
import { jobTypeMap } from '../data/mockData';

interface JobDetailProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, open, onClose }) => {
  if (!job) return null;

  const formatSalary = () => {
    const { min, max, currency, period } = job.salary;
    const periodLabel = period === 'monthly' ? '月' : '年';
    if (max) {
      return `${currency}${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k / ${periodLabel}`;
    }
    return `${currency}${(min / 1000).toFixed(0)}k+ / ${periodLabel}`;
  };

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-4">
            <Avatar
              src={job.companyLogo}
              alt={job.company}
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
                border: '2px solid #f0f0f0',
              }}
            />
            <Box>
              <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                {job.title}
              </Typography>
              <Box className="flex items-center gap-2">
                <Business sx={{ fontSize: 18, color: '#6b7280' }} />
                <Typography variant="body1" className="text-gray-600">
                  {job.company}
                </Typography>
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box className="p-6">
          <Box className="flex flex-wrap gap-2 mb-6">
            <Chip
              label={jobTypeMap[job.jobType] || job.jobType}
              color={getJobTypeColor(job.jobType)}
            />
            <Chip
              label={job.industry}
              variant="outlined"
              sx={{ borderColor: '#e5e7eb' }}
            />
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Box className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <LocationOn sx={{ color: '#ef4444', fontSize: 24 }} />
              <Box>
                <Typography variant="caption" className="text-gray-500">
                  工作地点
                </Typography>
                <Typography variant="body1" className="font-semibold">
                  {job.location}
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <AttachMoney sx={{ color: '#10b981', fontSize: 24 }} />
              <Box>
                <Typography variant="caption" className="text-gray-500">
                  薪资范围
                </Typography>
                <Typography variant="body1" className="font-semibold text-green-600">
                  {formatSalary()}
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <People sx={{ color: '#6366f1', fontSize: 24 }} />
              <Box>
                <Typography variant="caption" className="text-gray-500">
                  公司规模
                </Typography>
                <Typography variant="body1" className="font-semibold">
                  {job.companySize}
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <AccessTime sx={{ color: '#f59e0b', fontSize: 24 }} />
              <Box>
                <Typography variant="caption" className="text-gray-500">
                  发布时间
                </Typography>
                <Typography variant="body1" className="font-semibold">
                  {job.postedDate}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 6 }} />

          <Box className="mb-6">
            <Box className="flex items-center gap-2 mb-3">
              <Work sx={{ color: '#6366f1' }} />
              <Typography variant="h6" className="font-bold">
                职位描述
              </Typography>
            </Box>
            <Typography variant="body1" className="text-gray-700 leading-relaxed">
              {job.description}
            </Typography>
          </Box>

          <Box className="mb-6">
            <Box className="flex items-center gap-2 mb-3">
              <CheckCircle sx={{ color: '#10b981' }} />
              <Typography variant="h6" className="font-bold">
                任职要求
              </Typography>
            </Box>
            <List>
              {job.requirements.map((req, index) => (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={req}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: '#374151',
                        fontSize: '0.95rem',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box className="mb-6">
            <Box className="flex items-center gap-2 mb-3">
              <Star sx={{ color: '#f59e0b' }} />
              <Typography variant="h6" className="font-bold">
                福利待遇
              </Typography>
            </Box>
            <Box className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <Chip
                  key={index}
                  label={benefit}
                  variant="filled"
                  sx={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    fontSize: '0.9rem',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          className="p-6 pt-0"
          sx={{
            position: 'sticky',
            bottom: 0,
            background: 'linear-gradient(to top, white 80%, transparent)',
          }}
        >
          <Box className="flex gap-4">
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '1rem',
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                },
              }}
            >
              立即申请
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '1rem',
                px: 6,
                borderColor: '#e5e7eb',
                color: '#6b7280',
                '&:hover': {
                  borderColor: '#6366f1',
                  color: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                },
              }}
            >
              收藏职位
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetail;
