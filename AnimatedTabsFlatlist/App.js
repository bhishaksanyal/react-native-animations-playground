import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Dimensions, Image } from 'react-native';

const { height, width } = Dimensions.get("screen");

const images = {
  Thor: 'https://images.unsplash.com/photo-1536895878856-6738f6d20051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  Groot: 'https://images.unsplash.com/photo-1580923368248-877f237696cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  LockManager: 'https://images.unsplash.com/photo-1584985429926-08867327d3a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
  Keychain: 'https://images.unsplash.com/photo-1624505474107-840f25fbfb96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  Human: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
}

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i]
}))

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces
        renderItem={({item}) => {
          return (
            <View style={{ width, height }}>
              <Image source={{uri: item.image}} style={{flex: 1, resizeMode: 'cover'}} />
              <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0,0,0,0.3)'}]}></View>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
