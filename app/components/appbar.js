import * as React from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, InputBase, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Use FastfoodIcon or any other suitable icon
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '60%',
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton onClick={()=>{router.push("/dashboard")}}>
            <ListItemIcon >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton >
        </ListItem>
        <ListItem key="Suggest Recipe" disablePadding>
          <ListItemButton onClick={()=>{router.push("/recipe")}}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Suggest Recipe" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Add Ingredients" disablePadding>
          <ListItemButton onClick={()=>{router.push("/additems")}}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Ingredients" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Logout" disablePadding>
          <ListItemButton onClick={()=>{router.push("/Signin")
            localStorage.setItem('userid','');
          }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Your PantryPal
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for items.."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}

