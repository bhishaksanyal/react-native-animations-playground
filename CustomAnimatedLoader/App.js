import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

const { height, width } = Dimensions.get("screen");

const LoaderComponent = ({size}) => {
  return (
    <View 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', height, width, zIndex: 99, position: 'absolute'}}
    >
      <MotiView
        from={{
          transform: [{ scale: 1 }, { rotateX: '0 deg' }, {rotateZ: '10 deg'}],
        }}
        animate={{
          transform: [{ scale: 1.5 }, { rotateX: '10 deg' }, { rotateZ: '10 deg'}],
        }}
        transition={{
          type: 'timing',
          duration: 2000,
          loop: true
        }}
        style={{
          width: size,
          height: size,
          borderRadius: size/2,
          borderWidth: size/10,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: { width:0, height:0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          position: 'absolute'
        }}
      />

      <MotiView
        from={{
          transform: [{ scale: 1 }, { rotateY: '0 deg' }, {rotateZ: '10 deg'}],
        }}
        animate={{
          transform: [{ scale: 1.5 }, { rotateY: '10 deg' }, { rotateZ: '10 deg'}],
        }}
        transition={{
          type: 'timing',
          duration: 2000,
          loop: true
        }}
        style={{
          width: size * 2,
          height: size * 2,
          borderRadius: size,
          borderWidth: (size*2)/10,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: { width:0, height:0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          position: 'absolute'
        }}
      />

    </View>
  )
}

export default function App() {
  return (
    <>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LoaderComponent size={50} />
    </View>
    </>
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
