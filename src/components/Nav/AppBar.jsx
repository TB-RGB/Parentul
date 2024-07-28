import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  };

  const pages = user.id ? ['Chat', 'Chat History', 'FAQ'] : [];
  const settings = user.id ? ['User Preferences', 'Logout'] : ['Login'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E1E1E' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/home"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/images/parentullogo.png"
              alt="Parentul Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(' ', '')}`}
                sx={{ color: 'white', display: 'block', mx: 1 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} src={user.profile_pic_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.id && (
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {pages.map((page) => (
                    <MenuItem 
                      key={page} 
                      component={Link}
                      to={`/${page.toLowerCase().replace(' ', '')}`}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                </Box>
              )}
              {(user.id ? settings : ['Login']).map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Logout') {
                      handleLogout();
                    } else if (setting === 'User Preferences') {
                      history.push('/preferences');
                    } else if (setting === 'Login') {
                      history.push('/login');
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;