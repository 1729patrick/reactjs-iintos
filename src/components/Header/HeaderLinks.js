/*eslint-disable*/
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
//import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Logo from '~/assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from '~/components/CustomDropdown/CustomDropdown';
import Button from '~/components/CustomButtons/Button';
import styles from '~/assets/jss/material-kit-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="IINTOS Project"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          s
          dropdownList={[
            <Link to="/iproject" className={classes.dropdownLink}>
              About
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              IINTOS Partners
            </Link>,
            <Link to="/ievents" className={classes.dropdownLink}>
              IINTOS Events
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              IINTOS Products
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="International Offices"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          dropdownList={[
            <Link to="/iproject" className={classes.dropdownLink}>
              Forum
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              ?????
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              ????
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              ?????
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="International Projects"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          dropdownList={[
            <Link to="/iproject" className={classes.dropdownLink}>
              News
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              Projects
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              Wiki
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              Helping Tools
            </Link>,
            <Link to="/iproject" className={classes.dropdownLink}>
              ??????
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/login" className={classes.navLink}>
          Login
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}></ListItem>
    </List>
  );
}
