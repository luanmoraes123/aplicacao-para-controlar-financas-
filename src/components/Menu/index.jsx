'use client'
import * as S from './style'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import GridViewIcon from '@mui/icons-material/GridView';
import WalletIcon from '@mui/icons-material/Wallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const  Menu = ({children}) => {
  return (
    <Box  sx={{ display: 'flex' }}>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'black',
            color: '#fff'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <S.Typography variant='h1'>Yourfinance.io</S.Typography>
        <List>
          
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary='Menu principal' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WalletIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary='Categoria' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SwapHorizIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary='Extrato' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon style={{color: '#fff'}}/>
                </ListItemIcon>
                <ListItemText primary='Sair' />
              </ListItemButton>
            </ListItem>
      </ List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Menu;
