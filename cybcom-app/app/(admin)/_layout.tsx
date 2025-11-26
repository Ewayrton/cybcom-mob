import { Stack } from 'expo-router';
import React from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function AdminLayout() {
  return (
    <GluestackUIProvider mode="dark">
        <Stack>
            <Stack.Screen 
                name="dashboard" 
                options={{ 
                    headerShown: true, 
                    title: "Painel Admin",
                    // Ajuste a cor de fundo do header para combinar com o tema
                    headerStyle: { backgroundColor: '#181719' }, 
                    headerTintColor: '#fff',
                    headerBackTitle: 'Voltar'
                }} 
            />
        </Stack>
    </GluestackUIProvider>
  );
}