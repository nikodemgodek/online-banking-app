import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Donut from './components/Donut';


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

export default function App() {
  return (
    <View style={styles.container}>

      { data.map( (d, i) => {
        return(
          <Donut key={i} max={d.max} percentage={d.percentage} color={d.color} radius={d.radius}/>
        )
      })}

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
