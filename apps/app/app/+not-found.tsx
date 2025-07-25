import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '앗!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">이 화면은 존재하지 않습니다.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">홈 화면으로 이동하세요!</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
