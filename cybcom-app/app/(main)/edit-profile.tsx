// cybcom-app/app/(main)/edit-profile.tsx

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
// Certifique-se de que lucide-react-native esteja instalado se a seta não for um componente local

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
// import userServices from "@/services/userService";
// Importe o serviço real para a chamada à API de atualização

// Dados de usuário mockados para inicialização (Em um cenário real, você buscará do useUserStore)
const mockUser = {
  id: "user-123", // Adicionado ID para simular a chamada API
  name: "Deivyson José",
  email: "deivyson@example.com",
  website: "https://deivyson-silva.vercel.app",
  linkedin: "https://linkedin.com/in/deivyson",
  github: "https://github.com/deivyson",
  avatar: "https://i.pravatar.cc/300",
};

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  // 1. Estados para os campos do formulário, inicializados com os dados atuais
  const [name, setName] = useState(mockUser.name);
  const [website, setWebsite] = useState(mockUser.website);
  const [linkedin, setLinkedin] = useState(mockUser.linkedin);
  const [github, setGithub] = useState(mockUser.github);
  const [avatarUrl, setAvatarUrl] = useState(mockUser.avatar);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    const userDataToUpdate = {
      name,
      website: website || null, // Garante que strings vazias sejam null para a store/API
      linkedin: linkedin || null,
      github: github || null,
      avatar: avatarUrl,
    };

    try {
      // **Implementação Real:** Chamar o serviço de atualização
      // const updatedUser = await userServices.updateProfile(mockUser.id, userDataToUpdate);
      // useUserStore.getState().setUser(updatedUser); // Atualiza o estado global

      // Simulação de delay de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Perfil atualizado com sucesso (Mock):", userDataToUpdate);

      router.back(); // Volta para a tela de perfil
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      // Exibir toast de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Personalizado com Botão Voltar */}
      <View
        className="absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
        style={{ paddingTop: insets.top + 10 }}
      >
        <HStack space="md" className="items-center">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-black dark:text-white" />
          </Pressable>
          <Heading size="lg">Editar Perfil</Heading>
        </HStack>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 60, // Espaço abaixo do header
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 20,
        }}
        className="flex-1"
      >
        <VStack space="xl" className="mt-4">
          {/* AVATAR */}
          <VStack className="items-center" space="md">
            <Avatar size="2xl">
              <AvatarFallbackText>{name}</AvatarFallbackText>
              <AvatarImage source={{ uri: avatarUrl }} />
            </Avatar>
            <Pressable
              onPress={() => alert("Função de upload de foto pendente!")}
            >
              <Text className="text-primary-500 dark:text-[#64FFDA] font-bold">
                Alterar Foto
              </Text>
            </Pressable>
          </VStack>

          <Divider />

          {/* CAMPOS DO FORMULÁRIO */}
          <VStack space="lg">
            {/* Nome */}
            <Box>
              <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                Nome Completo
              </Text>
              <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <InputField
                  placeholder="Seu nome"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </Input>
            </Box>

            {/* E-mail (Somente Leitura) - Mantendo o padrão de design */}
            <Box>
              <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                Email (Não Editável)
              </Text>
              <Input className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-60">
                <InputField
                  placeholderTextColor="#9CA3AF"
                  value={mockUser.email}
                  editable={false}
                />
              </Input>
            </Box>

            {/* Website */}
            <Box>
              <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                Website / Portfolio (URL)
              </Text>
              <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <InputField
                  placeholder="https://seu-site.com"
                  placeholderTextColor="#9CA3AF"
                  value={website ?? ""}
                  onChangeText={setWebsite}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </Input>
            </Box>

            {/* LinkedIn */}
            <Box>
              <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn (URL Completa)
              </Text>
              <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <InputField
                  placeholder="https://linkedin.com/in/seu-perfil"
                  placeholderTextColor="#9CA3AF"
                  value={linkedin ?? ""}
                  onChangeText={setLinkedin}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </Input>
            </Box>

            {/* GitHub */}
            <Box>
              <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                GitHub (Username ou URL)
              </Text>
              <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                <InputField
                  placeholder="https://github.com/seu-perfil"
                  placeholderTextColor="#9CA3AF"
                  value={github ?? ""}
                  onChangeText={setGithub}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </Input>
            </Box>
          </VStack>

          {/* BOTÃO SALVAR */}
          <Button
            className="w-full mt-4 bg-[#64FFDA] border-0"
            action="primary"
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ButtonText className="text-black text-base font-bold">
                Salvando...
              </ButtonText>
            ) : (
              <ButtonText className="text-black text-base font-bold">
                Salvar Alterações
              </ButtonText>
            )}
          </Button>
        </VStack>
      </ScrollView>
    </View>
  );
}
