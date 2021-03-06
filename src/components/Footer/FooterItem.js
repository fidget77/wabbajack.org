import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, Link } from '@material-ui/core';

export default function FooterItem(props) {
  const { link, name } = props;
  return (
    <ListItem>
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </Link>
    </ListItem>
  );
}

FooterItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
