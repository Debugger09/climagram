import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e3c72",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Connexion",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Inscription",
        }}
      />
    </Stack>
  );
} 