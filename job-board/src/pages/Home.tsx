import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import JobCard from '../components/JobCard';
import JobDetail from '../components/JobDetail';
import type { Job, Filters } from '../types';
import { mockJobs, filterOptions, jobTypeMap } from '../data/mockData';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: '全部',
    jobType: '全部',
    salaryRange: '全部',
    search: '',
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (searchValue) {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.location !== '全部' && job.location !== filters.location) {
        return false;
      }

      if (filters.jobType !== '全部') {
        const jobTypeLabel = jobTypeMap[job.jobType] || job.jobType;
        if (jobTypeLabel !== filters.jobType) {
          return false;
        }
      }

      if (filters.salaryRange !== '全部') {
        const salaryRange = filterOptions.salaryRanges.find(
          (r) => r.label === filters.salaryRange
        );
        if (salaryRange) {
          const jobSalary = job.salary.period === 'monthly' 
            ? job.salary.min 
            : job.salary.min / 12;
          
          if (salaryRange.max !== null) {
            if (jobSalary < salaryRange.min || jobSalary >= salaryRange.max) {
              return false;
            }
          } else {
            if (jobSalary < salaryRange.min) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }, [searchValue, filters]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handleBookmarkToggle = (jobId: string) => {
    setBookmarkedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <Box className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        searchValue={searchValue}
        bookmarkCount={bookmarkedJobs.size}
      />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box className="mb-8">
          <Typography
            variant="h4"
            className="font-bold text-gray-900 mb-2"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            发现理想工作
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            探索数千个优质职位机会，找到适合你的下一份工作
          </Typography>
        </Box>

        <Box className="flex flex-row gap-6">
          <Box className="w-80 shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              searchValue={searchValue}
              resultCount={filteredJobs.length}
            />
          </Box>

          <Box className="flex-1">
            {filteredJobs.length === 0 ? (
              <Alert
                severity="info"
                sx={{
                  borderRadius: '12px',
                  py: 3,
                }}
              >
                <Typography variant="h6" className="font-semibold mb-1">
                  没有找到匹配的职位
                </Typography>
                <Typography variant="body2">
                  请尝试调整筛选条件或搜索关键词
                </Typography>
              </Alert>
            ) : (
              <Box className="grid grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={handleViewDetails}
                    isBookmarked={bookmarkedJobs.has(job.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <JobDetail
        job={selectedJob}
        open={detailOpen}
        onClose={handleCloseDetail}
      />
    </Box>
  );
};

export default Home;
