import React from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text} from 'native-base';
import {job} from '../../declarations';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  job: job;
}

const defaultLogo = require('../../assets/defaultLogo.jpg');

const JobContainer = (props: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {job: props.job})}>
      <Card>
        <CardItem>
          <Body style={styles.mainContainer}>
            <Image
              source={
                props.job.company.logoUrl
                  ? {uri: props.job.company.logoUrl}
                  : defaultLogo
              }
              style={styles.logoContainer}
            />
            <Body style={styles.middleContainer}>
              <Text style={styles.jobTitle}>{props.job.title}</Text>
              <Text style={styles.companyName}>{props.job.company.name}</Text>
            </Body>
            <Body style={styles.locationContainer}>
              {props.job.cities.slice()[0] ? (
                <Text style={{textAlign: 'center'}}>
                  {props.job.cities.slice()[0].name}{' '}
                </Text>
              ) : null}
              <Text>
                {props.job.remotes.slice()[0]
                  ? props.job.remotes.slice()[0].name
                  : null}
              </Text>
            </Body>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default JobContainer;
