import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5B5BD6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="invoice/[id]"
          options={{
            title: 'Dettagli Fattura',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="scan"
          options={{
            title: 'Scansiona Fattura',
            presentation: 'modal',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
