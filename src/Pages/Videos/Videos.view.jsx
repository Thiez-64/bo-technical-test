import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../widgets/Section';
import styles from './videos.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { colors } from '../../muiColors';

function VideosView({ classes, videos, handleVideoClick }) {
  return (
    <div style={{ padding: '0px 10px', marginBottom: '40px' }}>
      <Section label="Videos">
        <div className={styles.container}>
          <Grid container>
            {videos.map((sport, i) => (
              <Grid key={`${sport}-${i}`} item xs={12} sm="auto">
                <Card style={{ backgroundColor: colors.turquoise }} className={styles.card}>
                  <span className={styles.menuIcon}>
                    <YouTubeIcon fontSize="inherit" />
                  </span>
                  <CardContent className={classes.cardContent}>{sport.name}</CardContent>
                  <CardActionArea
                    className={classes.cardAction}
                    onClick={() => handleVideoClick(sport.id)}>
                    details
                    <ChevronRightIcon fontSize="large" />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Section>
    </div>
  );
}

export default VideosView;

VideosView.propTypes = {
  videos: PropTypes.array,
  handleVideoClick: PropTypes.func,
  classes: PropTypes.object,
};
