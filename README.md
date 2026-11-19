# correiajoao.github.io

Site pessoal de João Correia. A página inicial (`index.html`) está em português do Brasil e a versão em inglês fica em `en/index.html`.

## Como adicionar materiais de aula

Edite `class-links.js`. Adicione materiais à lista `documents` ou `activities`. Use um link que os alunos tenham permissão para abrir. O título `pt` aparece em português e o campo opcional `en` exibe um título em inglês. As duas versões usam a mesma URL.

```js
const classLinks = {
  documents: [
    { pt: 'Plano de ensino', en: 'Course syllabus', url: 'https://exemplo.org/plano.pdf' },
  ],
  activities: [],
};
```
