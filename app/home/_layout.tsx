import { Stack, } from 'expo-router/stack';

export default function Layout() {
    return <Stack 
        screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#822321',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
    />;
}