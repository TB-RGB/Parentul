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
  };

  const handleUserPreferences = () => {
    dispatch({ type: 'FETCH_USER_PREFERENCES', payload: { userId: user.id } });
  };


  const pages = user.id ? [
    {page:'Chat', Link: '/chat'},
    {page: 'Chat History', Link: `/chathistory/${user.id}`},
    {page: 'FAQ', Link: '/questions'}] : [];
  const settings = user.id ? [
    {page: 'User Preferences', Link: `/preferences/${user.id}`},
    {page: 'Logout', Link: '/login'}] : [{page: 'Login', Link: '/login'}];

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
            {pages.map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.Link}
                sx={{ color: 'white', display: 'block', mx: 1 }}
              >
                {page.page}
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
                  {pages.map((page, index) => (
                    <MenuItem 
                      key={index} 
                      component={Link}
                      to={page.Link}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{page.page}</Typography>
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                </Box>
              )}
              {(settings).map((setting, index) => (
                <MenuItem 
                  key={index}
                  component={Link}
                  to={setting.Link}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.page === 'Logout') {
                      handleLogout();
                    } else if (setting.page === 'User Preferences') {
                      handleUserPreferences();
                    } else if (setting.page === 'Login') {
                      history.push('/login');
                    }
                  }}
                >
                  <Typography textAlign="center">{setting.page}</Typography>
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