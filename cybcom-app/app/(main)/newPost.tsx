import React, { useState, useEffect } from "react";
import { View, TextInput, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { categoryService } from "@/services/categoryService";
import { usecategorysStore } from "@/stores/useCategoryStore";
import { postsService } from "@/services/postsService";
import { router } from "expo-router";

export default function NewPost() {
    const insets = useSafeAreaInsets();
    const { categories, setCatecories } = usecategorysStore()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imagem, setImagem] = useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    //  BUSCAR CATEGORIAS
    useEffect(() => {
        async function awaitCategories() {
            let categories = await categoryService.findAll()
            setCatecories(categories)
        }
        awaitCategories()
    }, []);

    async function pickImage() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            alert("Permissão necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    }

    function removeImage() {
        setImagem(undefined);
    }

    async function handlePublish() {
            if (!title || !content || !categoryId) return Alert.alert('Preencha todos os campos')
            
            try {
                await postsService.create({title: title, content: content, categoryId: categoryId, image_url: imagem})
                Alert.alert("Criado com sucesso")
                router.back()
            } catch (error: any) {
                Alert.alert(`Erro: ${error.message}`)
            }
        
        }

    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text className="text-3xl font-extrabold text-white mb-6">Criar Post</Text>

                <Box className="bg-[#0B1A2A] p-6 rounded-2xl">

                    <Text className="text-white mb-1">Título</Text>
                    <TextInput
                        className="bg-[#1A2C3A] text-white p-3 rounded-xl mb-4"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text className="text-white mb-1">Descrição</Text>
                    <TextInput
                        multiline
                        className="bg-[#1A2C3A] text-white p-3 rounded-xl mb-4"
                        value={content}
                        onChangeText={setContent}
                    />

                    <Text className="text-white mb-1">Categoria</Text>
                    <View className="mb-4 bg-[#1A2C3A] rounded-xl">
                        {categories.length === 0 && (
                            <Text className="text-white p-3 text-center">Nenhuma categoria encontrada</Text>
                        )}

                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                className={`p-3 ${categoryId === cat.id ? "bg-[#64FFDA]" : ""}`}
                                onPress={() => setCategoryId(cat.id)}
                            >
                                <Text className={categoryId === cat.id ? "text-black" : "text-white"}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity onPress={pickImage} className="bg-[#1A2C3A] p-3 rounded-xl mb-4">
                        <Text className="text-[#64FFDA] text-center">
                            {imagem ? "Trocar imagem" : "Selecionar imagem"}
                        </Text>
                    </TouchableOpacity>

                    {imagem && (
                        <>
                            <Image source={{ uri: imagem }} style={{ width: "100%", height: 200, borderRadius: 12 }} />
                            <TouchableOpacity onPress={removeImage} className="bg-red-600 p-2 rounded-xl mt-2">
                                <Text className="text-white text-center">Excluir Imagem</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <Button className="w-full bg-[#64FFDA] mt-6" onPress={handlePublish} disabled={loading}>
                        <ButtonText className="text-black font-bold">
                            {loading ? "Publicando..." : "Publicar"}
                        </ButtonText>
                    </Button>

                </Box>
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
