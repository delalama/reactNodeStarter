import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Carlos from './../static/images/carlos.png';

export default function ImageAvatars() {
  return (
    <div>
      <Avatar
        alt={Carlos}
        src="./../static/images/download.jpeg"
        sx={{ width: 24, height: 24 }}
      />

      <Avatar alt="Remy Sharp" src="./../static/images/carlos.png" />

      <Avatar
        alt="Remy Sharp"
        src="./../static/images/carlos.png"
        sx={{ width: 56, height: 56 }}
      />
    </div>
  );
}
