import { Button, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export interface PostCreationProgressBarProps {
  activeSection: boolean[];
}

const PostCreationProgressBar = (props: PostCreationProgressBarProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [progressTitle, setProgressTitle] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (props.activeSection[0]) {
      setActive(true);
      setProgressTitle('Choose post type');
      setPercentage(0.25);
    } else if (props.activeSection[1]) {
      setActive(true);
      setProgressTitle('Choose category');

      setPercentage(0.5);
    } else if (props.activeSection[2]) {
      setActive(true);
      setProgressTitle('Fill post details');
      setPercentage(0.75);
    } else if (props.activeSection[3]) {
      setActive(true);
      setProgressTitle('Choose groups to publish in');
      setPercentage(1);
    } else {
      setActive(false);
    }
  }, [props.activeSection]);

  if (active) {
    return (
      <>
        <Text style={styles.progressStatus}>{progressTitle}</Text>
        <Progress.Bar progress={percentage} width={250} style={styles.progressBar} />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  progressBar: { display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 20 },
  progressStatus: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default PostCreationProgressBar;
