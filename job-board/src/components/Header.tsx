import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search,
  Bookmark,
  Menu,
  Work,
  Person,
  Notifications,
} from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';

interface HeaderProps {
  onSearch: (value: string) => void;
  searchValue: string;
  bookmarkCount?: number;
}

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '32ch',
    },
  },
}));

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchValue,
  bookmarkCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const menuItems = [
    { text: '首页', icon: <Work /> },
    { text: '收藏夹', icon: <Bookmark /> },
    { text: '我的', icon: <Person /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
        >
          <Work sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            JobBoard
          </Typography>
        </Box>

        {!isMobile && (
          <SearchContainer>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="搜索职位、公司..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            sx={{
              textTransform: 'none',
              fontWeight: 'medium',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            发布职位
          </Button>

          <IconButton
            size="large"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge badgeContent={bookmarkCount} color="error">
              <Bookmark />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            sx={{
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Person />
          </IconButton>
        </Box>

        <IconButton
          size="large"
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu />
        </IconButton>
      </Toolbar>

      {isMobile && (
        <Box sx={{ px: 2, pb: 2 }}>
          <SearchContainer>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="搜索职位、公司..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
              fullWidth
            />
          </SearchContainer>
        </Box>
      )}

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <Box
            sx={{
              px: 3,
              pb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Work sx={{ fontSize: 28, color: '#667eea' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              JobBoard
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                component="div"
                key={item.text}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.icon}
                  <ListItemText primary={item.text} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
