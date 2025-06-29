import { getShareExtensionKey } from 'expo-share-intent'

type RedirectSystemPathParams = { path: string }

export function redirectSystemPath({ path }: RedirectSystemPathParams) {
  try {
    if (path.includes(`dataUrl=${getShareExtensionKey()}`)) {
      return '/save'
    }

    return path
  } catch {
    return '/'
  }
}
