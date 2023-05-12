import { Stack , withLayoutContext} from "expo-router";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { useAuthentication } from "../../context/AuthContext";
import { ActivityIndicator, Text } from "react-native";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator)

export const unstable_settings = {
    initialRouteName: '(tabs)'
}
function CustomDrawer(props){
    return(
        <DrawerContentScrollView {...props}>
          <Text style={{alignSelf: "center", fontSize:20}}>George Test</Text>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}
export default function DrawerLayout() {
    const {authToken} = useAuthentication()
    if (!authToken){
        return <ActivityIndicator />;
    }
    return(
        <Drawer drawerContent={(props) => <CustomDrawer {...props} />} >
          <Drawer.Screen name="(tabs)" options={{headerShown: false, title:"Home"}} />
          <Drawer.Screen name="Bookmarks" options={{headerShown: false, title:"Bookmarks"}} />
          <Drawer.Screen name="TwitterBlue" options={{headerShown: false, title:"Twitter Blue"}} />
        </Drawer>
    )
    
}