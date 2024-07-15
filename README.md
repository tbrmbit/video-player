
# Video-Player

Desenvolvido para a criação de um player de video em uma página

## Uso/Exemplos

```javascript
import VideoPlayer from "./video-player/video-player.js";

// Sem parâmetros usando div com um id padrão "tmf_video" e passando parametros por data atributos
const videoPlayer = new VideoPlayer();

// Com parâmetros usando div com um id padrão "tmf_video" e passando um objeto
const videoPlayer = new VideoPlayer('my_id', {src: "meu-video.mp4", poster: "minha-imagem.jpg", title:"Meu titulo"});
```


## Instalação

Após clonar o projeto é só instalar as dependências com npm e depois rodar o projeto

```bash
  npm install
  npm start
```

Para rodar os testes com jest

```bash
  npm test
```
