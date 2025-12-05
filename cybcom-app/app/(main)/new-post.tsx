import React, { useState, useEffect } from "react";
import { View, TextInput, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function NewPost() {
  const [token, setToken] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // TOKEN PARA TESTE
  useEffect(() => {
    setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzhhYmNiLTUxNDMtNDc1Yi1hMTMxLWZmODE2MWIyZGI4MCIsInVzZXJJZCI6IjdiMWY2ZTdmLTcyYjQtNDBkMy04NGJhLTVjMjBiODRjMTU0ZiIsImlhdCI6MTc2NDcyNTE4OCwiZXhwIjoxNzY1MzI5OTg4fQ.z_IdjdTCrZEIF7zCM2QGnrzADwUSBCMsyXRufCs2bBY");
  }, []);

  //  BUSCAR CATEGORIAS
  useEffect(() => {
    if (!token) return;

    fetch("https://backend-cyb-com.vercel.app/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("CATEGORIAS:", data);

        if (!res.ok) throw new Error("Token inválido ou sem permissão");

        setCategorias(data);
        if (data.length > 0) setCategoriaId(data[0].id);
      })
      .catch((err) => {
        console.log("ERRO:", err.message);
        Alert.alert("Erro", "Não foi possível carregar categorias");
      });
  }, [token]);

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
    setImagem(null);
  }

  async function handlePublish() {
    if (!titulo || !descricao || !categoriaId || !token) {
      Alert.alert("Erro", "Preencha tudo!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", titulo);
      formData.append("content", descricao);
      formData.append("categoryId", String(categoriaId));

      if (imagem) {
        formData.append("image_url", {
          uri: imagem,
          name: "post.jpg",
          type: "image/jpeg",
        } as any);
      }

      const res = await fetch("https://backend-cyb-com.vercel.app/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao criar post");

      Alert.alert("Sucesso", "Post criado!");
      setTitulo("");
      setDescricao("");
      setImagem(null);
      setCategoriaId(categorias.length > 0 ? categorias[0].id : null);

    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
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
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text className="text-white mb-1">Descrição</Text>
          <TextInput
            multiline
            className="bg-[#1A2C3A] text-white p-3 rounded-xl mb-4"
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text className="text-white mb-1">Categoria</Text>
          <View className="mb-4 bg-[#1A2C3A] rounded-xl">
            {categorias.length === 0 && (
              <Text className="text-white p-3 text-center">Nenhuma categoria encontrada</Text>
            )}

            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className={`p-3 ${categoriaId === cat.id ? "bg-[#64FFDA]" : ""}`}
                onPress={() => setCategoriaId(cat.id)}
              >
                <Text className={categoriaId === cat.id ? "text-black" : "text-white"}>
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
    </View>
  );
}
