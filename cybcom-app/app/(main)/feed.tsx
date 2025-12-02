import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, TextStyle, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

// Stores & Services
import { usePostsStore } from '@/stores/usePostsStore';

// Componentes
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RefreshScrollView } from '@/components/RefreshScrollView';
import { StatusBarBlur } from '@/components/StatusBarBlur';

// UI Components
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon, ThreeDotsIcon, FavouriteIcon, MessageCircleIcon, ShareIcon } from '@/components/ui/icon';

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const { colorScheme } = useColorScheme();
  
  // Hook da Store (Zustand)
  const { posts, fetchPosts, isLoading } = usePostsStore();

  // Carregar posts ao abrir a tela
  useEffect(() => {
    fetchPosts();
  }, []);

  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 88;
  const FULL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

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

  const onScrollRefresh = async () => {
    // Recarrega os dados reais do backend
    await fetchPosts();
  };

  const getTextStyle = (isActive: boolean): TextStyle => ({
    color: isActive 
      ? (colorScheme === 'dark' ? '#FFFFFF' : '#000000') 
      : '#71767B',
    fontWeight: isActive ? '700' : '500',
    fontSize: 15,
  });

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBarBlur />
      
      <TopHeader 
        headerTranslateY={headerTranslateY}
        fullHeight={FULL_HEADER_HEIGHT}
        bottomContent={
          <View style={styles.tabsRow}>
             <TouchableOpacity
               onPress={() => setActiveTab('forYou')}
               style={styles.tab}
               activeOpacity={0.7}
             >
               <View style={styles.tabContent}>
                 <Text style={getTextStyle(activeTab === 'forYou')}>Para você</Text>
                 {activeTab === 'forYou' && <View style={styles.indicator} />}
               </View>
             </TouchableOpacity>

             <TouchableOpacity
               onPress={() => setActiveTab('following')}
               style={styles.tab}
               activeOpacity={0.7}
             >
               <View style={styles.tabContent}>
                 <Text style={getTextStyle(activeTab === 'following')}>Seguindo</Text>
                 {activeTab === 'following' && <View style={styles.indicator} />}
               </View>
             </TouchableOpacity>
          </View>
        }
      >
        <Image 
           source={require('../../assets/images/logo-cybcom-sem-fundoPNG.png')} 
           style={{ width: 28, height: 28 }}
           resizeMode="contain"
        />
      </TopHeader>

      <RefreshScrollView
        onRefresh={onScrollRefresh}
        scrollViewProps={{
          onScroll: scrollHandler,
          scrollEventThrottle: 16,
          contentContainerStyle: { 
            paddingTop: FULL_HEADER_HEIGHT + 10, 
            paddingBottom: 100 
          },
        }}
      >
        <Box className="flex-1 min-h-screen bg-white dark:bg-black">
          <Box className="px-0">
            
            {/* Loading State */}
            {isLoading && posts.length === 0 && (
              <Box className="py-10 items-center">
                <ActivityIndicator size="large" color="#64FFDA" />
              </Box>
            )}

            {/* Empty State */}
            {!isLoading && posts.length === 0 && (
              <Box className="py-10 items-center px-6">
                <Text className="text-gray-500 text-center">
                  Ainda não há publicações. Seja o primeiro a postar!
                </Text>
              </Box>
            )}

            {/* Lista Real de Posts */}
            {posts.map((post) => (
              <Box key={post.id} className="mb-1 border-b border-outline-100 dark:border-outline-800 py-4 px-4">
                <HStack space="md" className="items-start">
                   {/* Avatar do Usuário */}
                   <Avatar size="sm" className="bg-primary-600">
                    <AvatarFallbackText>{post.user?.name || 'User'}</AvatarFallbackText>
                    {post.user?.avatar && (
                      <AvatarImage 
                        source={{ uri: post.user.avatar }} 
                      />
                    )}
                  </Avatar>
                  
                  <VStack className="flex-1">
                    <HStack className="justify-between items-center mb-1">
                        <HStack space="xs" className="items-center">
                            <Text className="text-black dark:text-white font-bold text-base">
                              {post.user?.name || 'Usuário Desconhecido'}
                            </Text>
                            <Text className="text-typography-500 dark:text-typography-400 text-sm">
                              {/* Exibe data simples ou use biblioteca como date-fns */}
                              @{post.user?.username || 'user'} · {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                        </HStack>
                        <Icon as={ThreeDotsIcon} className="text-typography-400" size="sm" />
                    </HStack>

                    {/* Conteúdo do Post */}
                    <Text className="text-black dark:text-white text-base leading-6 mb-3">
                      {post.content}
                    </Text>

                    {/* Imagem do Post (se houver) */}
                    {post.image_url && (
                       <Image 
                         source={{ uri: post.image_url }}
                         style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 12 }}
                         resizeMode="cover"
                       />
                    )}

                    <HStack className="justify-between pr-8">
                        <HStack space="xs" className="items-center">
                            <Icon as={MessageCircleIcon} className="text-typography-400" size="sm" />
                            <Text className="text-typography-400 text-xs">0</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                             <Icon as={ShareIcon} className="text-typography-400" size="sm" />
                             <Text className="text-typography-400 text-xs">0</Text>
                        </HStack>
                        <HStack space="xs" className="items-center">
                            <Icon as={FavouriteIcon} className="text-typography-400" size="sm" />
                            <Text className="text-typography-400 text-xs">0</Text>
                        </HStack>
                        <Icon as={ShareIcon} className="text-typography-400" size="sm" />
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            ))}

          </Box>
        </Box>
      </RefreshScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44, 
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    bottom: 0, 
    width: 56, 
    height: 4, 
    backgroundColor: '#64FFDA', 
    borderRadius: 2, 
  }
});