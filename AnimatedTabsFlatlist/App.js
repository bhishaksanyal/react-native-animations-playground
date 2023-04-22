import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get("screen");

const images = {
  Thor: 'https://images.unsplash.com/photo-1536895878856-6738f6d20051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  Groot: 'https://images.unsplash.com/photo-1580923368248-877f237696cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  Manage: 'https://images.unsplash.com/photo-1584985429926-08867327d3a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
  Keychain: 'https://images.unsplash.com/photo-1624505474107-840f25fbfb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  Human: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
}

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef()
}));

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={{color: 'white', fontSize: 84 / data.length, fontWeight: '800'}}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
});

const Indicator = ({measures, scrollX}) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View style={{
      position: 'absolute', 
      height: 4, 
      backgroundColor: 'white',
      width: indicatorWidth, 
      left: 0,
      bottom: -10,
      transform: [{
        translateX
      }]
    }}>

    </Animated.View>
  )
}

const Tabs = ({ data, scrollX, onItemPress }) => {
  const [ measures, setMeasures ] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    let m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(containerRef.current, (x,y,width,height) => {
        m.push({
          x,
          y,
          width,
          height
        });

        if (m.length === data.length) {
          setMeasures(m);
        }
      })
    });
  }, []);

  console.log(measures);
  return (
    <View style={{position: 'absolute', top: 80, width}}>
      <View 
        ref={containerRef}
        style={{justifyContent: 'space-evenly', flex: 1, flexDirection: 'row'}}>
        {
          data.map((item, index) => {
            return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => {
              onItemPress(index);
            }} />
          })
        }
      </View>
      { measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
  )
}

export default function App() {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback(itemIndex => {
    ref.current.scrollToOffset({
      offset: itemIndex * width
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        ref = {ref}
        data = {data}
        keyExtractor = {(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces
        onScroll = {Animated.event(
          [
            { 
              nativeEvent: { 
                contentOffset: { 
                  x: scrollX 
                } 
              }
            }
          ],
          { useNativeDriver: false }
        )}
        renderItem = {({item}) => {
          return (
            <View style={{ width, height }}>
              <Image source={{uri: item.image}} style={{flex: 1, resizeMode: 'cover'}} />
              <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0,0,0,0.3)'}]}></View>
            </View>
          )
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
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
