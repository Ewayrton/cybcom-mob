// ProfileScreen.tsx
import React from "react";
import { ScrollView, Linking, View } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Stack, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT_BASE = 44 + 5 + insets.top;
  const EXTRA_SPACING = 20;
  const HEADER_OFFSET = HEADER_HEIGHT_BASE + EXTRA_SPACING;

  const user = {
    name: "Deivyson José",
    email: "deivyson@example.com",
    website: "https://deivyson-silva.vercel.app",
    linkedin: "https://linkedin.com/in/deivyson",
    github: "https://github.com/deivyson",
    avatar: "https://i.pravatar.cc/300",
    followers: 120,
    following: 89,
    posts: [
      { id: 1, title: "Introdução ao YOLO para detecção" },
      { id: 2, title: "Guia: Conectar Python + Arduino" },
      { id: 3, title: "React Native + GlueStack UI" },
    ],
  };

  function openLink(url: string) {
    Linking.openURL(url);
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_OFFSET,
          paddingBottom: insets.bottom + 60,
        }}
        className="flex-1 px-4"
      >
        <VStack space="lg">
          {/* FOTO + NOME */}
          <HStack space="lg" className="flex items-center flex-col">
            <Avatar size="xl">
              <AvatarFallbackText>{user.name}</AvatarFallbackText>
              <AvatarImage source={{ uri: user.avatar }} />
            </Avatar>

            <VStack>
              <Heading size="lg">{user.name}</Heading>
              <Text size="sm" className="text-dark dark:text-white">
                {user.email}
              </Text>
            </VStack>
          </HStack>

          <Divider />

          {/* LINKS */}
          <VStack
            className="flex flex-row flex-wrap items-center justify-center"
            space="md"
          >
            <Pressable onPress={() => openLink(user.website)}>
              <Text size="md">🌐 website</Text>
            </Pressable>

            <Pressable onPress={() => openLink(user.linkedin)}>
              <Text size="md">💼 LinkedIn</Text>
            </Pressable>

            <Pressable onPress={() => openLink(user.github)}>
              <Text size="md">🐙 GitHub</Text>
            </Pressable>
          </VStack>

          <Divider />

          {/* FOLLOWERS */}
          <HStack className="flex flex-raw items-center justify-center gap-8">
            <VStack className="flex flex-col items-center">
              <Heading size="md">{user.followers}</Heading>
              <Text size="sm">Seguidores</Text>
            </VStack>

            <VStack className="flex flex-col items-center">
              <Heading size="md">{user.following}</Heading>
              <Text size="sm">Seguindo</Text>
            </VStack>
          </HStack>
          {/* Botão editar perfil */}
          <Button
            action="primary"
            onPress={() => router.push("/(main)/edit-profile" as any)}
          >
            <ButtonText>Editar Perfil</ButtonText>
          </Button>

          <Divider />

          {/* HISTÓRICO DE POSTS */}
          <VStack className="flex flex-col items-center" space="md">
            <Heading size="md">Histórico de Posts</Heading>

            {user.posts.map((post) => (
              <Box key={post.id} className="mb-3">
                <Text size="md">{post.title}</Text>
                <Divider />
              </Box>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom, // respeita áreas de dispositivos com bordas
          backgroundColor: "#fff",
        }}
      >
        <BottomNav />
      </View>
    </View>
  );
}
