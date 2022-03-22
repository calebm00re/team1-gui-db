import { Grid } from '@mui/material';
import * as React from 'react';
import { Navbar } from './Navbar';
import { Leftbar } from './Leftbar';
import { Feed } from './Feed';
import { Rightbar } from './Rightbar';

export const Home = () => {

  return (
    <>
      <div>
        <Navbar />
        <Grid container>
          <Grid item sm={2}>
            <Leftbar />
          </Grid>
          <Grid item sm={7}>
            <Feed />
          </Grid>
          <Grid item sm={3}>
            <Rightbar />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
