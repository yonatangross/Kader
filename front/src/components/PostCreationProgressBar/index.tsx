import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export interface PostCreationProgressBarProps {
  activeSection: number;
  numberOfSections: number;
}

const PostCreationProgressBar = (props: PostCreationProgressBarProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [progressTitle, setProgressTitle] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    let sectionPercentage = 1 / props.numberOfSections;
    if (props.activeSection === 0) {
      setActive(true);
      setProgressTitle('Choose Post Type');
      setPercentage(0);
    } else if (props.activeSection === 1) {
      setActive(true);
      setProgressTitle('Choose category');
      setPercentage(1 * sectionPercentage);
    } else if (props.activeSection === 2) {
      setActive(true);
      setProgressTitle('Fill post details');
      setPercentage(2 * sectionPercentage);
    } else if (props.activeSection === 3) {
      setActive(true);
      setProgressTitle('Choose groups to publish in');
      setPercentage(3 * sectionPercentage);
    } else {
      setActive(false);
    }
  }, [props.activeSection]);

  if (active) {
    return (
      <>
        <Text style={styles.progressStatus}>{progressTitle}</Text>
        <Progress.Bar progress={percentage} width={280} height={8} borderWidth={1}  style={styles.progressBar} />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  progressBar: { display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 20,borderColor:'#394d51' },
  progressStatus: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    color:'#394d51'
  },
});

export default PostCreationProgressBar;
