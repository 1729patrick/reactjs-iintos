import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleImageSlider from 'react-simple-image-slider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TextareaAutosize from 'react-textarea-autosize';

import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { format } from 'date-fns';
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FileList from '~/components/FileList';
import api from '~/services/api';
import { Container, Detail, Session } from './styles';

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await api.get('events');

      const eventsType = {};
      response.data.forEach(event => {
        const preview_ = [];
        const files_ = [];

        event.files &&
          event.files.forEach(file => {
            const [type] = file.name.split('.').reverse();

            const isImage =
              type === 'png' ||
              type === 'jpg' ||
              type === 'jpeg' ||
              type === 'JPG';

            if (isImage) {
              preview_.push({ type: 'image', file });
            } else {
              files_.push(file);
            }
          });

        event.links &&
          event.links.forEach(link => {
            preview_.push({ type: 'link', link });
          });

        const e = {
          ...event,
          files: files_,
          preview: preview_,
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
      const [type] = file?.name?.split('.').reverse();

      const isImage = type === 'png' || type === 'jpg' || type === 'jpeg';
      return !isImage;
    });

    const getContent = ({ url, name }) => (
      <a href={url} style={{ marginRight: 10 }} target="_blank">
        {name}
      </a>
    );

    if (!files.length) {
      return null;
    }

    if (files.length > 1) {
      return (
        <div style={{ marginTop: 10 }}>
          <FileList files={files} />
        </div>
      );
    }

    return (
      <div style={{ marginTop: 10 }}>
        {files?.map(({ url, name }) => getContent({ url, name }))}
      </div>
    );
  };

  const handleOpen = key => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const mountVideos = ({ preview }) => {
    const getContent = ({ type, file, link }) => {
      if (type !== 'image') {
        return (
          <iframe
            key={1}
            width="300"
            height="150"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ marginRight: 10, borderRadius: 4, marginBottom: 10 }}
          />
        );
      }
    };

    if (preview.length === 1 && !preview[0].link) return null;

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          overflowX: 'auto',

          marginTop: 15,
        }}
      >
        {preview?.map(({ type, file, link, name }) => {
          return getContent({ type, file, link, name });
        })}
      </div>
    );
  };

  const mountImages = ({ preview }) => {
    if (preview.length === 1 && !preview[0].link) return null;

    const images = preview
      ?.filter(({ type }) => type === 'image')
      .map(({ file }) => ({ url: file.url }));

    if (!images.length) return null;

    return (
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          overflowX: 'auto',

          marginTop: 15,
        }}
      >
        <SimpleImageSlider
          width={896}
          height={504}
          images={images}
          slideDuration={1}
        />
      </div>
    );
  };

  const getImage = preview => {
    if (!preview.length || preview.length > 1) return null;

    return preview[0].file.url;
  };

  const onOpen = () => {
    setOpen({ 'Multiplier Events': true });
  };

  const mountEvent11 = id => {
    if (id !== 11) return;

    return (
      <>
        <div
          style={{
            justifyContent: 'flex-start',
            margin: '15px 0',
            fontSize: 17,
            textTransform: 'uppercase',
          }}
        >
          News about this event
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <a
            href="https://www.si.ips.pt/ips_si/noticias_geral.ver_noticia?P_NR=7796"
            target="_blank"
          >
            Conferência IINTOS | Projeto para agilizar mobilidade internacional
            nas escolas
          </a>
          <a
            href="https://issuu.com/ipsetubal/docs/jornalmovete_mai_jun2020"
            target="_blank"
            style={{ marginLeft: 15 }}
          >
            Jornal MOVEte | nº14 | maio/junho 2020
          </a>
        </div>

        <iframe
          key={1}
          width="300"
          height="150"
          src="https://www.youtube.com/embed/DnOvxDtYpn0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
        />
      </>
    );
  };

  return (
    <Container>
      <h1>Within the scope of this project, the following events were held:</h1>

      {Object.keys(events).map(
        key =>
          key !== 'Transnational Meetings' && (
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
                  (
                    { id, title, description, files, preview, sessions },
                    index
                  ) => (
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
                            {getImage(preview) && (
                              <img src={getImage(preview)} />
                            )}

                            {description.includes('{{fbgroupss}}') ? (
                              <span style={{ width: '64%' }}>
                                <TextareaAutosize
                                  disabled
                                  defaultValue={description.replace(
                                    '{{fbgroupss}}',
                                    ''
                                  )}
                                />
                                <a
                                  href="https://www.facebook.com/groups/226456891770079"
                                  target="_blank"
                                >
                                  https://www.facebook.com/groups/226456891770079
                                </a>
                              </span>
                            ) : (
                              <TextareaAutosize
                                disabled
                                defaultValue={description}
                              />
                            )}
                          </span>

                          {mountEvent11(id)}
                          {mountImages({ preview })}
                          {mountVideos({ preview })}
                          {mountFiles({ files })}

                          <div>
                            {sessions?.map((session, index) => (
                              <Session>
                                <h1>
                                  {session?.title?.trim()?.length > 0 ? (
                                    <span>
                                      <span>{session.title}</span>
                                    </span>
                                  ) : (
                                    <span>Session {index + 1}</span>
                                  )}
                                  <span
                                    style={{
                                      color: '#444',
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

                                {mountImages(session)}
                                {mountVideos(session)}
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
          )
      )}
    </Container>
  );
}

export default Events;
