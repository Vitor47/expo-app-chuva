import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListOccurrences from '../pages/ListOccurrences';
import DetailOccurrence from '../pages/DetailOccurrence';
import CreateOccurrence from '../pages/CreateOccurrence';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="ListOcurrences"
                component={ListOccurrences}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="DetailOccurrence"
                component={DetailOccurrence}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="CreateOccurrence"
                component={CreateOccurrence}
                options={{
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;