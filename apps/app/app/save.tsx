import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { create } from '@/lib/pogetto'
import { useQuery } from '@tanstack/react-query'
import { useShareIntentContext } from 'expo-share-intent'
import { StyleSheet } from 'react-native'

export default function SaveScreen() {
  const shareIntentContext = useShareIntentContext()
  const { status } = useQuery({
    queryKey: [shareIntentContext.shareIntent.webUrl],
    queryFn: () => {
      return create(shareIntentContext.shareIntent)
    },
    enabled: shareIntentContext.hasShareIntent,
  })

  return (
    <ThemedView style={styles.container}>
      {shareIntentContext.error && (
        <ThemedText>{shareIntentContext.error}</ThemedText>
      )}
      {shareIntentContext.hasShareIntent && (
        <ThemedText>
          {(() => {
            switch (status) {
              case 'pending':
                return '저장 중...'
              case 'success':
                return '저장됨'
              case 'error':
                return '에러'
              default:
                return null
            }
          })()}
        </ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
