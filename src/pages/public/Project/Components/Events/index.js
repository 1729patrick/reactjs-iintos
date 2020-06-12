import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { Container, Detail, Session } from './styles';
import api from '~/services/api';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { format } from 'date-fns';
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import FileList from '~/components/FileList';

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('events');

      const eventsType = {};
      response.data.forEach(event => {
        const e = {
          ...event,
          sessions: event.sessions.map(session => {
            const preview = [];
            const files = [];

            session.files.forEach(file => {
              const [type] = file.name.split('.').reverse();

              const isImage =
                type === 'png' || type === 'jpg' || type === 'jpeg';

              if (isImage) {
                preview.push({ type: 'image', file });
              } else {
                files.push(file);
              }
            });

            session.links.forEach(link => {
              preview.push({ type: 'link', link });
            });

            return { ...session, preview, files };
          }),
        };

        eventsType[event.type] = [...(eventsType[event.type] || []), e];
      });

      setEvents(eventsType);
    };

    fetchResults();
  }, []);

  const mountFiles = ({ files }) => {
    files = files.filter(file => {
      const [_, type] = file?.name?.split('.');

      const isImage = type === 'png' || type === 'jpg' || type === 'jpeg';
      return !isImage;
    });

    const getContent = ({ url, name }) => (
      <a href={url} style={{ marginLeft: 10 }}>
        {name}
      </a>
    );

    if (!files.length) {
      return null;
    }

    return (
      <div style={{ marginTop: 10 }}>
        Docs: {files?.map(({ url, name }) => getContent({ url, name }))}
      </div>
    );
  };

  const handleOpen = key => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const mountPreview = ({ preview }) => {
    const getContent = ({ type, file, link }) => {
      if (type === 'image') {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <img
              src={file.url}
              style={{
                margin: '0 auto',
                marginBottom: 5,
                width: 150,
              }}
            />
            {file.name}
          </div>
        );
      }

      return (
        <iframe
          width="250"
          height="125"
          src={link}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginRight: 10, borderRadius: 4 }}
        />
      );
    };

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          overflowX: 'auto',
        }}
      >
        {preview?.map(({ type, file, link, name }) => {
          return getContent({ type, file, link, name });
        })}
      </div>
    );
  };

  const getImage = files => {
    for (let file of files) {
      const [_, type] = file?.name?.split('.');

      const isImage = type === 'png' || type === 'jpg' || type === 'jpeg';

      if (isImage) {
        return file.url;
      }
    }

    return null;
  };

  return (
    <Container>
      <h1>Within the scope of this project, the following events were held:</h1>
      {Object.keys(events).map(key => (
        <>
          <ListItem
            button
            onClick={() => handleOpen(key)}
            style={{ marginTop: 30 }}
          >
            <ListItemText
              primary={`${key.charAt(0)?.toUpperCase()}${key?.slice(1)}`}
            />
            {open[key] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[key]} timeout="auto" unmountOnExit>
            {events[key].map(
              ({ id, title, description, files, sessions }, index) => (
                <ExpansionPanel defaultExpanded={!index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      <h2>
                        {title}
                        {/* - <span>{format(new Date(date), 'yyyy-MM-dd')}</span> */}
                      </h2>
                    </Typography>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Detail>
                      <span>
                        {getImage(files) && <img src={getImage(files)}></img>}

                        <TextareaAutosize disabled defaultValue={description} />
                      </span>

                      {id === 11 && (
                        <a
                          href="https://bit.ly/30ACC2X"
                          target="__blank"
                          style={{ marginBottom: 10 }}
                        >
                          Pre-register form
                        </a>
                      )}
                      {mountFiles({ files })}

                      <div>
                        {sessions?.map((session, index) => (
                          <Session>
                            <h1>
                              {session?.title?.trim()?.lenght > 0 ? (
                                <span>
                                  Session {index + 1}:{' '}
                                  <span>{session.title}</span>
                                </span>
                              ) : (
                                <span>Session {index + 1}</span>
                              )}
                              <span
                                style={{
                                  color: '#666',
                                  marginLeft: 'auto',
                                  fontSize: 14,
                                }}
                              >
                                {/* {format(new Date(session.date), 'yyyy-MM-dd')} */}
                              </span>
                            </h1>

                            {session?.description?.trim().length > 0 && (
                              <TextareaAutosize
                                disabled
                                defaultValue={session.description}
                              />
                            )}

                            {mountPreview(session)}
                            {session?.files?.length > 0 && (
                              <FileList files={session.files} />
                            )}
                          </Session>
                        ))}
                      </div>
                    </Detail>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            )}
          </Collapse>
        </>
      ))}
    </Container>
  );
}

export default Events;
