import React, { useState } from "react";
import { View, ActivityIndicator, Alert, Pressable } from "react-native";
import { router } from "expo-router";
import { authService } from "@/services/authService";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmSenha) {
      return Alert.alert("Atenção", "Por favor, preencha todos os campos.");
    }
    if (senha !== confirmSenha) {
      return Alert.alert("Erro", "As senhas não coincidem.");
    }

    try {
      setIsLoading(true);
      
      // O 'nome' digitado no input será enviado como 'username' para o backend
      await authService.register(nome, email, senha);

      Alert.alert("Sucesso", "Conta criada! Faça login para continuar.", [
        { text: "OK", onPress: () => router.back() }
      ]);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Não foi possível criar a conta.";
      Alert.alert("Erro", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-black">
      <Box className="flex-1 justify-center px-8">
        
        {/* BOTÃO VOLTAR */}
        <Button
            className="w-24 mb-6 bg-[#64FFDA] border-0"
            variant="solid"
            action="primary"
            onPress={() => router.back()}
          >
            <ButtonText className="text-base font-bold text-black">Voltar</ButtonText>
        </Button>

        <Text className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
          Criar conta
        </Text>
        <Text className="text-base text-slate-600 dark:text-slate-400 mb-8">
          Preencha os campos para começar.
        </Text>

        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">Nome de Usuário</Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField placeholder="Seu nome" placeholderTextColor="#9CA3AF" value={nome} onChangeText={setNome} />
          </Input>
        </Box>

        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">Email</Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField placeholder="email@mail.com" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </Input>
        </Box>

        <Box className="mb-4">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">Senha</Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField placeholder="Sua senha" placeholderTextColor="#9CA3AF" secureTextEntry value={senha} onChangeText={setSenha} />
          </Input>
        </Box>

        <Box className="mb-6">
          <Text className="text-sm text-slate-700 dark:text-slate-300 mb-1">Confirmar senha</Text>
          <Input className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <InputField placeholder="Repita a senha" placeholderTextColor="#9CA3AF" secureTextEntry value={confirmSenha} onChangeText={setConfirmSenha} />
          </Input>
        </Box>

        <Button className="w-full mb-4 bg-[#64FFDA]" onPress={handleRegister} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#000" /> : <ButtonText className="text-black text-base font-bold">Começar</ButtonText>}
        </Button>

        <Box className="items-center mt-2 flex-row justify-center">
          <Text className="text-slate-700 dark:text-slate-300">Já tem uma conta?</Text>
          <Pressable onPress={() => router.back()}>
            <Text className="ml-1 text-primary-600 dark:text-[#64FFDA] font-bold">Faça login</Text>
          </Pressable>
        </Box>

      </Box>
    </View>
  );
}