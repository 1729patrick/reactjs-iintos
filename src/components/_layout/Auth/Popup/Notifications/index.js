import React, { useEffect, useMemo } from 'react';
import { Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import { NavLink, withRouter } from 'react-router-dom';

import { Container } from './styles';
import api from '~/services/api';
import { formatDistance } from 'date-fns';

const Notifications = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const fetchNotifications = async () => {
    const response = await api.get('notifications');

    const today = new Date();
    const notificationsFormatted = response.data.map(notification => {
      return {
        ...notification,
        createdAt: `${formatDistance(
          new Date(notification.createdAt),
          today
        )} ago`,
      };
    });

    setNotifications(notificationsFormatted);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const badgeContent = useMemo(() => {
    return notifications.filter(({ read }) => !read).length;
  }, [notifications]);

  const readNotification = ({ _id }) => {
    api.put(`notifications/${_id}`, { read: true });

    setNotifications(
      notifications.map(notification => {
        if (notification._id === _id) {
          return { ...notification, read: true };
        }

        return notification;
      })
    );
  };

  const openNotification = ({ url, _id }) => {
    readNotification({ _id });

    history.push(`/${url}`);
  };

  return (
    <div>
      <Badge
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        color="primary"
        badgeContent={badgeContent}
      >
        <NotificationsIcon style={{ color: '#555', marginLeft: 0 }} />
      </Badge>

      <Popover
        onClick={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: 7 }}
      >
        <Container>
          <h2>Notifications</h2>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {notifications.map(({ _id, message, url, read, createdAt }) => (
              <div
                key={_id}
                style={{
                  padding: '7px 0',
                  borderTop: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => openNotification({ url, _id })}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {!read && (
                    <div
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: '#3f51b5',
                        marginRight: 15,
                      }}
                    />
                  )}

                  <div>
                    <p>{message}</p>

                    <p style={{ color: '#666' }}>{createdAt}</p>
                  </div>
                </div>
              </div>
            ))}
            {!notifications.length && (
              <p style={{ padding: '10px 0' }}>No notifications found.</p>
            )}
          </div>
        </Container>
      </Popover>
    </div>
  );
};

export default withRouter(Notifications);
