import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { Container, Detail, Session } from './styles';
import api from '~/services/api';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { format } from 'date-fns';

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('events');

      const eventsFormatted = response.data.map(event => ({
        ...event,
        sessions: event.sessions.map(session => {
          const preview = [];
          const files = [];

          session.files.forEach(file => {
            const [type] = file.name.split('.').reverse();

            const isImage = type === 'png' || type === 'jpg' || type === 'jpeg';

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
      }));

      setEvents(eventsFormatted);
    };

    fetchResults();
  }, []);

  const mountFiles = ({ files }) => {
    const getContent = ({ url, name }) => (
      <a href={url} style={{ marginLeft: 10 }}>
        {name}
      </a>
    );

    console.log(files);
    if (!files.length) {
      return null;
    }

    return (
      <div style={{ marginTop: 10 }}>
        Docs: {files?.map(({ url, name }) => getContent({ url, name }))}
      </div>
    );
  };

  const mountPreview = ({ preview }) => {
    const getContent = ({ type, file, link }) => {
      if (type === 'image') {
        return (
          <img
            src={file.url}
            style={{
              width: 150,
              marginRight: 10,
              marginTop: 0,
              marginLeft: 0,
              marginBottom: 0,
            }}
          />
        );
      }

      return (
        <iframe
          width="200"
          height="150"
          src={link}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginRight: 10, borderRadius: 4 }}
        />
      );
    };

    return (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        {preview?.map(({ type, file, link }) =>
          getContent({ type, file, link })
        )}
      </div>
    );
  };

  return (
    <Container>
      <h1>Within the scope of this project, the following events were held:</h1>
      {events.map(({ title, description, files, date, sessions }, index) => (
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
                {files[0]?.url && <img src={files[0]?.url}></img>}

                <TextareaAutosize disabled defaultValue={description} />
              </span>

              <div>
                {sessions?.map((session, index) => (
                  <Session>
                    <h1>
                      Session {index + 1}: <span>{session.title}</span>
                      <span
                        style={{
                          color: '#666',
                          marginLeft: 'auto',
                          fontSize: 14,
                        }}
                      >
                        {format(new Date(session.date), 'yyyy-MM-dd')}
                      </span>
                    </h1>

                    <TextareaAutosize
                      disabled
                      defaultValue={session.description}
                    />

                    {mountPreview(session)}
                    {mountFiles(session)}
                  </Session>
                ))}
              </div>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  );
}

export default Events;
