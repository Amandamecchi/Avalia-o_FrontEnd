'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [alunos, setAnimais] = useState([]);
  const apiKey = 's9DgdLx8PMVarz36H1K';
  const headers = { 'x-api-key': apiKey };

  useEffect(() => {
    const fetchComCache = async () => {
      const cacheKey = 'animalData';
      const cache = sessionStorage.getItem(cacheKey);

      if (cache) {
        setAnimais(JSON.parse(cache));
        return;
      }

      try {
        //mano arruma isso aqui quando vc terminar o básico
        const resposta = await axios.get('http://localhost:3000/api/estudante', { headers });
        setAnimais(resposta.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(resposta.data));
      } catch (erro) {
        alert('Erro ao buscar animais');
      }
    };

    fetchComCache();
  }, []);
}