import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/constant-volume', label: '恒温恒容' },
    { path: '/constant-pressure', label: '恒温恒压' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1e3a5f' }}>
        <Toolbar>
          <ScienceIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            惰性气体浓度影响模拟器
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#1e3a5f',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          气体浓度影响可视化模拟工具 - 基于理想气体状态方程
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
