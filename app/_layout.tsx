import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function AuthGuard() {
  const { user, initialized } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) return

    const inAuthGroup = segments[0] === "(auth)"

    if (!user && !inAuthGroup) {
      router.replace("/login")
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)")
    }
  }, [user, initialized, segments])

  return <Slot />
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard />
    </QueryClientProvider>
  )
}
