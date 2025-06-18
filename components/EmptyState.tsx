import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

interface EmptyStateProps {
  message: string
  icon?: keyof typeof Ionicons.glyphMap
}

export default function EmptyState({ message, icon = "cloud-offline" }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color="#1e3c72" style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
})
