import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { 
  BarChart3, 
  Users as UsersIcon, 
  FileText, 
  Tag, 
  AlertTriangle, 
  Edit, 
  Trash2 
} from 'lucide-react-native';

// Componentes UI do Projeto (Importados do padrão existente)
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Mock Data (Adaptado do seu exemplo web)
  const [users] = useState([
    { id: 1, name: "Ana Silva", email: "ana@email.com", role: "user", status: "active", joinDate: "2023-01-15" },
    { id: 2, name: "Carlos Santos", email: "carlos@email.com", role: "admin", status: "active", joinDate: "2023-01-10" }
  ]);
  
  const [posts] = useState([
    { id: 1, title: "Introdução ao Pentest", author: "Ana Silva", status: "published", date: "2024-01-15", views: 142 },
    { id: 2, title: "Segurança em APIs", author: "Carlos Santos", status: "draft", date: "2024-01-14", views: 0 }
  ]);

  // Estatísticas
  const stats = {
    totalUsers: 1242,
    totalPosts: 456,
    pendingModeration: 3,
    reports: 12
  };

  // Menu Superior (Chips)
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: UsersIcon },
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'categories', label: 'Categorias', icon: Tag },
    { id: 'reports', label: 'Reports', icon: AlertTriangle }
  ];

  // Helper para cores de status (Mapeando para as cores do tema Gluestack/Tailwind)
  // Correção: Tipagem explícita do retorno para satisfazer o componente Badge
  const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'muted' => {
    switch(status) {
      case 'active': case 'published': return 'success';
      case 'draft': case 'pending': return 'warning';
      case 'admin': return 'info';
      default: return 'muted'; // 'muted' é o padrão neutro seguro
    }
  };

  return (
    <Box className="flex-1 bg-background-0 dark:bg-background-950">
      
      {/* Configuração do Header da Página */}
      <Stack.Screen options={{ title: 'Painel Admin', headerBackTitle: 'Voltar' }} />

      {/* Menu de Navegação Horizontal (Substitui Sidebar para Mobile) */}
      <Box className="bg-background-50 dark:bg-background-900 shadow-sm border-b border-outline-100 dark:border-outline-800">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
          <HStack space="sm">
            {menuItems.map(item => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setActiveSection(item.id)}
                  style={{ marginRight: 8 }}
                >
                  <Box 
                    className={`flex-row items-center px-4 py-2 rounded-full border ${
                      isActive 
                        ? 'bg-primary-100 border-primary-500 dark:bg-primary-900 dark:border-primary-400' 
                        : 'bg-background-0 border-outline-100 dark:bg-background-800 dark:border-outline-800'
                    }`}
                  >
                    <Icon 
                      size={16} 
                      color={isActive ? '#0077E6' : '#737373'} 
                    />
                    <Text className={`ml-2 text-sm font-medium ${isActive ? 'text-primary-600 dark:text-primary-300' : 'text-typography-500'}`}>
                      {item.label}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </ScrollView>
      </Box>

      {/* Conteúdo Principal com Scroll */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* === SEÇÃO DASHBOARD === */}
        {activeSection === 'dashboard' && (
          <VStack space="md">
            <Heading className="text-xl font-bold text-typography-900 dark:text-typography-50 mb-2">
              Visão Geral
            </Heading>
            
            {/* Grid de Cards Estatísticos */}
            <Box className="flex-row flex-wrap justify-between -mx-1">
              {[
                { label: "Total de Usuários", value: stats.totalUsers, color: "text-blue-600", border: "border-l-4 border-blue-500" },
                { label: "Posts Publicados", value: stats.totalPosts, color: "text-green-600", border: "border-l-4 border-green-500" },
                { label: "Moderação", value: stats.pendingModeration, color: "text-yellow-600", border: "border-l-4 border-yellow-500" },
                { label: "Reports", value: stats.reports, color: "text-red-600", border: "border-l-4 border-red-500" },
              ].map((stat, index) => (
                <Box key={index} className="w-[48%] p-1 mb-2">
                  <Card className={`p-4 bg-background-0 dark:bg-background-800 shadow-sm rounded-lg ${stat.border}`}>
                    <Text className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </Text>
                    <Text className="text-xs text-typography-500 font-medium">
                      {stat.label}
                    </Text>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Lista de Atividade Recente */}
            <Box className="mt-4">
               <Heading size="md" className="mb-3 text-typography-800 dark:text-typography-100">Atividade Recente</Heading>
               <VStack space="sm">
                  <Card className="p-3 bg-background-0 dark:bg-background-800 rounded-lg flex-row justify-between items-center border border-outline-50 dark:border-outline-800">
                    <Text className="text-sm text-typography-700 dark:text-typography-200">Novo usuário registrado</Text>
                    <Text className="text-xs text-typography-400">2 min atrás</Text>
                  </Card>
                  <Card className="p-3 bg-background-0 dark:bg-background-800 rounded-lg flex-row justify-between items-center border border-outline-50 dark:border-outline-800">
                    <Text className="text-sm text-typography-700 dark:text-typography-200">Novo post publicado</Text>
                    <Text className="text-xs text-typography-400">15 min atrás</Text>
                  </Card>
               </VStack>
            </Box>
          </VStack>
        )}

        {/* === SEÇÃO USUÁRIOS === */}
        {activeSection === 'users' && (
          <VStack space="md">
            <Heading className="text-xl font-bold text-typography-900 dark:text-typography-50 mb-2">
              Gerenciar Usuários
            </Heading>
            
            {users.map(user => (
              <Card key={user.id} className="p-4 bg-background-0 dark:bg-background-800 rounded-xl mb-3 border border-outline-100 dark:border-outline-800 shadow-sm">
                <HStack className="justify-between items-start mb-2">
                  <VStack>
                    <Heading size="sm" className="text-typography-900 dark:text-typography-50">{user.name}</Heading>
                    <Text size="xs" className="text-typography-500">{user.email}</Text>
                  </VStack>
                  <Badge action={getStatusColor(user.status)} variant="solid" className="rounded-full">
                    <BadgeText className="text-xs">{user.status}</BadgeText>
                  </Badge>
                </HStack>
                
                <Divider className="my-2 bg-outline-100 dark:bg-outline-800" />
                
                <HStack className="justify-between items-center mt-1">
                   <Badge action={user.role === 'admin' ? 'info' : 'muted'} variant="outline" size="sm" className="rounded-md">
                      <BadgeText>{user.role.toUpperCase()}</BadgeText>
                   </Badge>
                   
                   <HStack space="lg">
                      <TouchableOpacity className="flex-row items-center">
                        <Edit size={16} color="#2563EB" />
                        <Text className="text-blue-600 text-xs ml-1 font-medium">Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center">
                        <Trash2 size={16} color="#DC2626" />
                        <Text className="text-red-600 text-xs ml-1 font-medium">Excluir</Text>
                      </TouchableOpacity>
                   </HStack>
                </HStack>
              </Card>
            ))}
          </VStack>
        )}

        {/* === SEÇÃO POSTS === */}
        {activeSection === 'posts' && (
          <VStack space="md">
            <Heading className="text-xl font-bold text-typography-900 dark:text-typography-50 mb-2">
              Gerenciar Posts
            </Heading>

            {posts.map(post => (
              <Card key={post.id} className="p-4 bg-background-0 dark:bg-background-800 rounded-xl mb-3 border border-outline-100 dark:border-outline-800 shadow-sm">
                <VStack space="xs">
                   <HStack className="justify-between items-center mb-1">
                      <Text className="text-xs text-typography-400">{post.date}</Text>
                      <Badge action={getStatusColor(post.status)} variant="outline" size="sm" className="rounded-full">
                        <BadgeText>{post.status}</BadgeText>
                      </Badge>
                   </HStack>
                   
                   <Heading size="sm" className="text-typography-900 dark:text-typography-50">
                      {post.title}
                   </Heading>
                   <Text className="text-xs text-typography-500 mb-2">
                      Por: {post.author}
                   </Text>

                   <Divider className="my-2 bg-outline-100 dark:bg-outline-800" />

                   <HStack className="justify-between items-center">
                      <HStack className="items-center bg-background-50 dark:bg-background-700 px-2 py-1 rounded">
                        <UsersIcon size={12} color="gray" />
                        <Text className="text-xs text-typography-500 ml-1 font-medium">{post.views} views</Text>
                      </HStack>
                      
                      <HStack space="md">
                         <Button variant="link" size="xs" className="h-auto p-0">
                           <ButtonText className="text-blue-600 font-medium">Editar</ButtonText>
                         </Button>
                         <Button variant="link" size="xs" className="h-auto p-0">
                           <ButtonText className="text-red-600 font-medium">Excluir</ButtonText>
                         </Button>
                      </HStack>
                   </HStack>
                </VStack>
              </Card>
            ))}
          </VStack>
        )}

        {/* Seções em Construção */}
        {(activeSection === 'categories' || activeSection === 'reports') && (
           <Box className="flex-1 items-center justify-center py-20 opacity-50">
              <AlertTriangle size={48} color="#A3A3A3" />
              <Heading size="md" className="text-typography-400 mt-4">Em Desenvolvimento</Heading>
              <Text className="text-typography-400 text-sm text-center px-8 mt-2">
                A gestão de {activeSection === 'categories' ? 'categorias' : 'reports'} estará disponível em breve.
              </Text>
           </Box>
        )}

      </ScrollView>
    </Box>
  );
}