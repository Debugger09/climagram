import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1e3c72",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
        },
        headerStyle: {
          backgroundColor: "#1e3c72",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Fil",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerTitle: "Fil d'actualités météo",
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          title: "Villes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={24} color={color} />
          ),
          headerTitle: "Météo des villes",
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publier",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
          headerTitle: "Nouvelle publication",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Moi",
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerTitle: "Mon journal météo",
        }}
      />
    </Tabs>
  );
} 