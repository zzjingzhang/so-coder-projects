import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BalanceIcon from '@mui/icons-material/Balance';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#1e3a5f',
            mb: 2,
          }}
        >
          惰性气体浓度影响模拟器
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#64748b',
            fontWeight: 400,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          探索在不同热力学条件下，添加惰性气体(如氦气)如何影响其他气体的浓度
        </Typography>
      </Box>

      <Box className="flex flex-wrap -mx-4 mb-6">
        <Box className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <BalanceIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              恒温恒容条件
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              在温度和体积保持不变的情况下，添加惰性气体会使总压强升高，
              但各气体的物质的量浓度保持不变。这是因为体积不变，
              各气体分子数也不变，所以浓度 c = n/V 保持不变。
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button
                component={Link}
                to="/constant-volume"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#1e3a5f',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                }}
              >
                开始模拟
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box className="w-full md:w-1/2 px-4">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <CompareArrowsIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              恒温恒压条件
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              在温度和压强保持不变的情况下，添加惰性气体会使总体积增大，
              因此各气体的物质的量浓度会降低。根据理想气体状态方程 PV = nRT，
              压强不变时，气体总物质的量增加导致体积增大，浓度 c = n/V 减小。
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button
                component={Link}
                to="/constant-pressure"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#1e3a5f',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                }}
              >
                开始模拟
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InfoOutlinedIcon sx={{ fontSize: 32, color: '#1e3a5f', mr: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
            科学原理
          </Typography>
        </Box>

        <Box className="flex flex-wrap -mx-4">
          <Box className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#475569', mb: 2 }}>
                理想气体状态方程
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: '#f8fafc',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  color: '#1e3a5f',
                  fontWeight: 600,
                }}
              >
                PV = nRT
              </Paper>
              <Typography variant="body2" sx={{ mt: 2, color: '#64748b' }}>
                其中：P 为压强，V 为体积，n 为物质的量，R 为气体常数，T 为热力学温度
              </Typography>
            </Box>
          </Box>

          <Box className="w-full md:w-1/2 px-4">
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#475569', mb: 2 }}>
              物质的量浓度
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: '#f8fafc',
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                textAlign: 'center',
                color: '#1e3a5f',
                fontWeight: 600,
              }}
            >
              c = n / V
            </Paper>
            <Typography variant="body2" sx={{ mt: 2, color: '#64748b' }}>
              浓度 c 与物质的量 n 成正比，与体积 V 成反比
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: '#e2e8f0' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#475569', mb: 2 }}>
            关键区别
          </Typography>
          <Box className="flex flex-wrap -mx-3">
            <Box className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f0f9ff' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0369a1', mb: 1 }}>
                  恒温恒容
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569' }}>
                  • V 不变，添加惰性气体后 P 升高
                  <br />
                  • 各气体的 n 不变，V 不变
                  <br />
                  • 因此各气体浓度 c = n/V <strong>不变</strong>
                </Typography>
              </Paper>
            </Box>
            <Box className="w-full sm:w-1/2 px-3">
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fdf2f8' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#be185d', mb: 1 }}>
                  恒温恒压
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569' }}>
                  • P 不变，添加惰性气体后 V 增大
                  <br />
                  • 各气体的 n 不变，但 V 增大
                  <br />
                  • 因此各气体浓度 c = n/V <strong>减小</strong>
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
