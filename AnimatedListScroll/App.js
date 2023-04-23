import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const DATA = [
  {
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },{
    email: 'lorem@ipsum.com',
    name: 'Lorem Ipsum'
  },
]

const SPACING = 20 
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + (SPACING * 3)

export default function App() {

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: { y:scrollY }}}],
          {useNativeDriver: true}
        )}
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 62
        }}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1)
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [
              1,
              1,
              1,
              0
            ]
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [
              1,
              1,
              1,
              0
            ]
          })

          return (
            <Animated.View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING,
              borderRadius: 12,
              shadowColor: '#000',
              shadowRadius: 20,
              shadowOffset: {
                width: 0,
                height: 10
              },
              shadowOpacity: 0.8,
              backgroundColor: 'white',
              transform: [{scale}],
              opacity
              }}>
              <View style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE,
                backgroundColor: "grey",
              }}>
              </View>
              <View style={{paddingTop: 10, paddingLeft: SPACING}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
                <Text style={{fontSize: 18, fontWeight: '400'}}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
