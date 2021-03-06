import React, {useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {Container} from 'native-base';
import {job, drawerList} from '../declarations';
import SearchBar from '../components/SearchBar';
import JobContainer from '../components/jobContainer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {observer} from 'mobx-react';
import {useMst} from '../store';

type HomeScreenNavigationProp = DrawerNavigationProp<drawerList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const homeScreen = observer((props: Props) => {
  const store = useMst();

  const {fetchingData, jobs} = {...store};
  const [searchTitle, setSearchTitle] = useState<String>('');

  if (fetchingData) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  const setSearch = (title: string) => {
    setSearchTitle(title);
  };

  const renderItem = (item: job) => {
    if (item.title.toLowerCase().includes(searchTitle.toLowerCase())) {
      return <JobContainer job={item} />;
    }
  };

  return (
    <Container>
      <SearchBar callback={setSearch} navigation={props.navigation} />

      <FlatList
        data={jobs.slice()}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
});

export default homeScreen;
