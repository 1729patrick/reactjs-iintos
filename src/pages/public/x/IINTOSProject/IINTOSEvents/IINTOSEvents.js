import React from 'react';
import { withRouter } from 'react-router';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// @material-ui/icons
import { toast } from 'react-toastify';

// core components
import Close from '@material-ui/icons/Close';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Button from '~/components/CustomButtons/Button';
import Parallax from '~/components/Parallax/Parallax';
import Events from './Sections/Events';
import EventCreateModal from './Components/EventFormModal';

import styles from '~/assets/jss/material-kit-react/views/iintosProject';
// Sections for this page
import api from '~/services/api';

const useLocalStyle = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {},
}));

const useStyles = makeStyles(styles);

const LandingPage = props => {
  const classes = useStyles();
  const localClasses = useLocalStyle();
  const { ...rest } = props;
  const [events, setEvents] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [modalParams, setModalParams] = React.useState({});

  const fetchEvents = async () => {
    const response = await api.get(`events`);

    const aux = response.data;

    setEvents(aux);
  };

  // Calls the new state of the web
  React.useState(() => {
    fetchEvents();
  }, []);

  const handleCreate = async values => {
    try {
      await api.post('events', values);
      setClassicModal(false);
      toast.success('Event created with success!');
      fetchEvents();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };
  const handleCreateEvent = () => {
    setModalParams({
      // validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Event',
    });

    setClassicModal('form');
  };
  const handleDetailRow = link => {
    props.history.push(link);
  };

  return (
    <div>
      <Header
        color="transparent"
        fixed
        changeColorOnScroll={{
          height: 50,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax small filter image={require('assets/img/profile-bg.jpg')} />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h1 className={classes.title}>IINTOS Events</h1>
                <h5 className={classes.description}>
                  See some of the events related with this project
                </h5>
              </GridItem>
            </GridContainer>
          </div>
          <div>
            <GridContainer justify="flex-end">
              <Button
                onClick={() => {
                  handleCreateEvent();
                }}
                color="primary"
              >
                Create
              </Button>
            </GridContainer>
          </div>
          <div>
            <Grid direction="row">
              {events.map(aux => {
                return (
                  <Events
                    title={aux.title}
                    shortDescription={aux.description}
                    type={aux.type}
                    date={aux.date}
                    link={() => {
                      handleDetailRow(`/ievents/${aux.id}`);
                    }}
                  />
                );
              })}
            </Grid>
          </div>
        </div>
        <EventCreateModal
          open={classicModal}
          setOpen={setClassicModal}
          {...modalParams}
        />
        <br />
        {/* A break didn't make nobody bad */}
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(LandingPage);
