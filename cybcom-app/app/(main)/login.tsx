import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importante!

// Services & Components
import { authService } from '@/services/authService';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha email e senha.');
    }

    try {
      setIsLoading(true);

      // 1. Faz o Login na Vercel
      const response = await authService.signIn(email, password);
      
      // 2. Verifica se o token veio (a chave no seu back é 'acess')
      const token = response.acess; 

      if (token) {
        // 3. Salva no armazenamento do celular
        await AsyncStorage.setItem('@cybcom:token', token);
        
        // 4. Salva também os dados do usuário se vierem (opcional)
        // await AsyncStorage.setItem('@cybcom:user', JSON.stringify(response.user));

        // 5. Vai para o Feed
        router.replace('/(main)/feed'); 
      } else {
        Alert.alert('Erro', 'O servidor não retornou o token.');
      }

    } catch (error: any) {
      console.log(error);
      const msg = error.response?.data?.message || 'Erro ao fazer login.';
      Alert.alert('Ops!', msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black justify-center px-8">
      <Box className="mb-8">
        <Text className="text-3xl font-bold text-black dark:text-white mb-2">
          Bem-vindo de volta!
        </Text>
        <Text className="text-gray-500">Faça login para continuar.</Text>
      </Box>

      <Box className="space-y-4">
        <Input className="mb-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <InputField 
            placeholder="Email" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Input>

        <Input className="mb-6 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <InputField 
            placeholder="Senha" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Input>

        <Button 
          className="bg-[#64FFDA] h-12 rounded-lg"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <ButtonText className="text-black font-bold">Entrar</ButtonText>
          )}
        </Button>
        
        <Button 
          variant="link" 
          className="mt-4"
          onPress={() => router.push('/(main)/register')}
        >
          <ButtonText className="text-gray-500">
            Não tem conta? <Text className="text-[#64FFDA] font-bold">Crie agora</Text>
          </ButtonText>
        </Button>
      </Box>
    </View>
  );
}