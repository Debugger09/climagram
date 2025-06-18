import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#F8F9FA",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
        },
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publier",
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
          headerTitle: "Nouvelle publication",
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Fil",
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper" size={size} color={color} />,
          headerTitle: "Fil d'actualités météo",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Moi",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          headerTitle: "Mon journal météo",
        }}
      />
    </Tabs>
  )
}
