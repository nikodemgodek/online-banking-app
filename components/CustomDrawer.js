import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, Image } from 'react-native';

const CustomDrawer = props => {
    return(
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#fff"}}>
                <View style={{ backgroundColor: 'transparent', padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'column'}}>
                        <Text style={{ fontSize: 20, fontWeight: 0, color: '#000', marginTop: 10, }}>Dzień dobry,</Text>
                        <Text style={{ fontSize: 20, fontWeight: 600, color: '#000',}}>Nikodem Godek</Text>
                    </View>
                    <Image style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: 'tomato' }} />
                </View>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;
