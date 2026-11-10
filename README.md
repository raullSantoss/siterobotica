# siterobotica

Site estático da campanha **Por um Amanhã**, da Discovery New Ways com a Casa do Hip-Hop.

## Fotos

- A seção **Entre nós**, dentro de “Quem somos”, apresenta cinco fotos da equipe em uma faixa automática contínua, sem botões ou interação por hover.
- A galeria da ação comunitária usa sete fotos fornecidas pela equipe, com legendas e texto alternativo.
- As imagens foram convertidas para WebP local, reduzindo o peso total e removendo metadados EXIF; as fotos horizontais da ação receberam corte inferior para tirar de cena as marcações de data e endereço.
- O carrossel continua rodando quando o sistema reduz movimentos, em velocidade mais lenta; a faixa nunca vira uma grade.

## Rodar localmente

Abra `index.html` ou sirva a pasta por um servidor HTTP local, por exemplo:

```powershell
python -m http.server 4174
```

Depois acesse `http://127.0.0.1:4174`.
