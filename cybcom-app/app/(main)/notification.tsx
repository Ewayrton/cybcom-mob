import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { StatusBarBlur } from '@/components/StatusBarBlur';
import { Text } from '@/components/ui/text';

export default function NotificationScreen() {
  const insets = useSafeAreaInsets();
  const FULL_HEADER_HEIGHT = 50 + insets.top;

  const headerTranslateY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;

      if (currentScrollY <= 0) {
        headerTranslateY.value = 0;
      } else {
        const newTranslateY = headerTranslateY.value - diff;
        if (newTranslateY < -FULL_HEADER_HEIGHT) {
          headerTranslateY.value = -FULL_HEADER_HEIGHT;
        } else if (newTranslateY > 0) {
          headerTranslateY.value = 0;
        } else {
          headerTranslateY.value = newTranslateY;
        }
      }
      lastScrollY.value = currentScrollY;
    },
  });

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />
      
      <TopHeader 
        headerTranslateY={headerTranslateY}
        fullHeight={FULL_HEADER_HEIGHT}
      >
        <Text className="text-lg font-bold text-black dark:text-white">
          Notificações
        </Text>
      </TopHeader>

      <RefreshScrollView
        scrollViewProps={{
          onScroll: scrollHandler,
          scrollEventThrottle: 16,
          contentContainerStyle: { 
            paddingTop: FULL_HEADER_HEIGHT + 20, 
            paddingBottom: 100,
            flexGrow: 1,
            justifyContent: 'center', 
            alignItems: 'center'
          },
        }}
      >
        <Text className="text-xl font-bold text-slate-500 dark:text-slate-400">
          Página Notificações
        </Text>
      </RefreshScrollView>

      <BottomNav />
    </View>
  );
}