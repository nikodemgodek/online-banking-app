import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Animated, TouchableOpacity } from 'react-native';
import Donut from './components/Donut';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const _spacing = 10;
const _menuIconSize = 25;
const _settingsIconSize = 25;
const ITEM_WIDTH = width * 0.9;
const _colorGrey = '#b5b5b5';

const data = [
  {
      max: 100,
      percentage: 15,
      color: '#00aaff',
      radius: 70,
  },
  {
      max: 100,
      percentage: 47,
      color: '#32aa',
      radius: 50,
  },
  {
      max: 100,
      percentage: 75,
      color: 'orange',
      radius: 100,
  },
]

const dummy = [

  {
    key: 1,
    balance: 2540.34,
    expiration: '06/23',
    virtual: true,
    cardImage: require('./assets/visa.png'),
  },
  {
    key: 2,
    balance: 760.03,
    expiration: '06/23',
    virtual: true,
    cardImage: require('./assets/visa.png'),
  },
  {
    key: 3,
    balance: 392.34,
    expiration: '06/23',
    virtual: true,
    cardImage: require('./assets/mastercard.png'),
  },
  {
    key: 4,
    balance: 760.00,
    expiration: '06/23',
    virtual: true,
    cardImage: require('./assets/visa.png'),
  },
  {
    key: 5,
    balance: 392.34,
    expiration: '06/23',
    virtual: false,
    cardImage: require('./assets/mastercard.png'),
  },
]

const dummyOptions = [
  { option: 'Refill', icon: 'rotate-cw' },
  { option: 'Transfer', icon: 'arrow-right-circle' },
  { option: 'Recharge', icon: 'plus-circle' },
];

const transactions = [
  {
    id: 301239,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 3012229,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },
  {
    id: 30122239,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 30126529,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },
  {
    id: 3012319,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 30122319,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },
  {
    id: 3012521232139,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 3032121232129,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },
  {
    id: 30123123119,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 301223312319,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },
  {
    id: 30121145239,
    type: 'Recharge',
    cardNo: '**** 3858',
    amount: 99.56,
    date: '2023-11-15',
  },
  {
    id: 3032111229,
    type: 'Transfer',
    cardNo: '**** 3858',
    amount: 100.00,
    date: '2023-11-15',
  },

]

export default function App() {
  return(
    <NavigationContainer>
      <Dashboard />
    </NavigationContainer>
  )
}

const Dashboard = () => {

  const flatListRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [viewPosition, setViewPosition] = React.useState(0.2);
  const [isScrolling, setIsScrolling] = React.useState(false)

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewPosition
    });
  }, [currentIndex])

  const handleScroll = (event) => {
    const nextIndex = Math.floor(event.nativeEvent.contentOffset.x / ITEM_WIDTH);

    if (!isScrolling && nextIndex !== currentIndex) {
      setIsScrolling(true);
      setCurrentIndex(nextIndex);
    }
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  
  return (
    <SafeAreaView style={{backgroundColor: '#f7f7f7' }}>
      <View style={{ marginHorizontal: 10 }}>
        <View style={
          { alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }
        }>
          <Feather name="align-left" size={_menuIconSize} color='#000' />
          <Text style={
            [
              { textTransform: 'uppercase', letterSpacing: .3},
              { fontSize: 16, fontWeight: '400', }
            ]
          }>Dashboard</Text>
          <Feather name="settings" size={_settingsIconSize} color='#000' />
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 20,}}>
          <Text style={{fontSize: 26, fontWeight: 600}}>Your cards</Text>
          <Text style={{fontSize: 12, color: '#b5b5b5'}}>{dummy.filter(card => card.virtual === true).length} physical, {dummy.filter(card => card.virtual === false).length} virtual</Text>
        </View>
      </View>
      <FlatList contentContainerStyle={{ paddingLeft: _spacing,}}
        ref={flatListRef}
        initialScrollIndex={currentIndex}
        style={{marginTop: 20}}
        bounces={false}
        data={dummy}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({item}) => {
          return(
            <View style={[
              {marginVertical: 5, marginRight: _spacing, paddingHorizontal: 40, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: ITEM_WIDTH, height: 200},
              {backgroundColor: '#fff', borderRadius: 50},
              { shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity:  0.17,
                shadowRadius: 3.05,
                elevation: 4,
              }
            ]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 30,}}>
                <Image resizeMode='cover' style={{ width: 50, height: 50 }} source={item.cardImage} />
                <Text style={{fontWeight: '600', color: _colorGrey}}>{item.expiration}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginBottom: 40}}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
                  <Text style={{fontSize: 36, fontWeight: '600'}}>{item.balance}</Text>
                  <Text style={{fontSize: 12, color: _colorGrey,}}>Total balance (PLN)</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start',}}>
                  <Feather name='bar-chart-2' size={30} color='#E52249' />
                </View>
              </View>
            </View>
          )
        }}
        keyExtractor={item => item.key}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal/>
      
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
        {dummyOptions.map( (item, index) => {
          return(
            <TouchableOpacity key={index} onPress={() => {}}>
              <View style={[
                {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 20, padding: 10, borderRadius: 50},
                { shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity:  0.17,
                  shadowRadius: 3.05,
                  elevation: 4,
                }
                ]}>
                <Feather style={{marginRight: 10}} name={item.icon} size={20} />
                <Text style={{fontSize: 16}}>{item.option}</Text>
              </View>
            </TouchableOpacity>
          )})}
        </View>
        <View style={
          [
            { width, height: height * 0.5, backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50},
            { shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity:  0.17,
                  shadowRadius: 5.05,
                  elevation: 4,
                }
          ]}>
            <View style={{marginVertical: 30, marginHorizontal: 10, height: height * 0.5}}>
              <Text style={{fontSize: 26, fontWeight: 500, marginBottom: 15, marginLeft: 15}}>Transactions</Text>
              <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={( {item} ) => {
                  return(
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10}}>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Feather style={{color: item.type === 'Transfer' ? '#FF0000' : '#38E17D'}} name={item.type === 'Transfer' ? 'arrow-up-right' : 'arrow-down-left'} size={25} />
                        <View style={{flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10}}>
                          <Text style={{fontSize: 20}}>{item.type} {item.cardNo}</Text>
                          <Text style={{fontSize: 12, color: _colorGrey}}>{item.date}</Text>
                        </View>
                      </View>
                      <Text style={{
                        color: item.type === 'Transfer' ? '#ff0000' : '#000'
                      }}><Text>{item.type === 'Transfer' ? '- ' : '+ '}</Text>{item.amount} PLN</Text>
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                pagingEnabled
              />
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
