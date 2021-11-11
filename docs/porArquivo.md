### pages/Home.tsx

Essa é a página do aplicativo. Aqui estão todas as funções que serão responsáveis pelo gerenciamento das tarefas no App e você deve implementar as funcionalidades. São elas:

- **handleAddTask:** Essa função deve receber o nome de uma tarefa e adicionar essa tarefa no estado no seguinte formato:
    
    ```tsx
    interface Task {
      id: number;
      title: string;
      done: boolean;
    }
    ```
    
    Para os valores da tarefa, você pode gerar um `id` aleatório usando o método `new Date().getTime()` e a propriedade `done` deve sempre ser iniciada com o valor `false`.
    Lembre-se também de manter as tarefas já existentes na listagem, apenas adicionando a nova tarefa. 
    
- **handleToggleTaskDone:** Essa função deve receber o `id` de uma tarefa e alterar a propriedade `done` para o inverso do seu valor, ou seja, altere para `true` caso esteja `false` ou altere para `false` caso esteja `true`. 
Lembre que você deve usar o conceito de imutabilidade sempre que alterar a informação de um estado. Ou seja, ao alterar a propriedade `done` de uma tarefa, não faça isso diretamente no estado `tasks`, salve a lista alterada em uma nova variável antes de salvar no estado.
    
    <aside>
    ℹ️ Você pode trabalhar com o método `find` para encontrar a `task` utilizando o `id` para comparação. É importante copiar com segurança o conteúdo de `tasks` antes de manipular o array para não quebrar o conceito de `imutabilidade`. Uma forma de fazer isso seria:
    
    `const updatedTasks = tasks.map(task ⇒ ({ ...task }))`
    
    </aside>
    
- **handleRemoveTask:** Como o próprio nome diz, essa função irá remover uma tarefa que possua o `id` igual ao `id` recebido. Para isso, você pode usar o método `filter`, criar uma nova lista com a tarefa removida a partir disso e salvar a informação no estado.

### components/TodoInput.tsx

Esse é o componente de input onde serão digitados os nomes das tarefas que serão adicionadas. Ao lado do input, existe um botão que adiciona o conteúdo digitado no input na lista de tarefas.

Nesse arquivo temos o estado `task` que deverá ser usado na propriedade `value` do componente `TextInput` e a função `setTask` que deve ser usada na propriedade `onChangeText` também do `TextInput`.

Você deve implementar a função que existe no arquivo que é:

- **handleAddNewTask**: Essa função deve ser chamada quando o botão `TouchableOpacity` for pressionado ou quando a tecla `enter` do teclado for pressionada (use a propriedade `onSubmitEditing` do `TextInput` para isso).
Ao receber o nome da tarefa na função, é importante que você verifique se esse nome é uma `string` válida. Isto é, o valor recebido **deve** ser diferente de uma `string` vazia.
Essa função deve chamar a função `addTask` (recebida nas propriedades do componente) passando o estado `task` como argumento. Lembre de limpar o estado `task` sempre que uma nova `task` for adicionada.

### components/TasksList.tsx

Esse componente irá exibir a listagem de `tasks` adicionadas. Nesse arquivo, você deverá fazer o uso das propriedades `removeTask` e `toggleTaskDone` recebidas pelo componente.

Ambas são funções e devem ser chamadas nos botões `TouchableOpacity` passando o `id` do `item` na lista. 

O primeiro `TouchableOpacity` é o marcador da task e deve chamar a função `toggleTaskDone`. O segundo `TouchableOpacity` é a lixeira e deve chamar a função `removeTask`.

Lembre-se de chamar a função passando o `id` como argumento corretamente. 

Exemplo:

```tsx
ERRADO:
<TouchableOpacity 
  onPress={handleSomething(item.id)}  
>
 <Text>Botão</Text>
</TouchableOpacity>

CERTO:
<TouchableOpacity 
  onPress={() => handleSomething(item.id)} 
>
 <Text>Botão</Text>
</TouchableOpacity>
```

Além disso, você deve também aplicar as estilizações (propriedade `style`) no `View` e `Text` para que exiba o item da tarefa corretamente quando marcado e quando desmarcado. Você pode usar a propriedade `done` do `item` na listagem para aplicar a estilização correta.

Caso a propriedade `done` esteja como `true`, você deve aplicar as seguintes estilizações:

- No componente `View` deve-se aplicar a estilização `styles.taskMarkerDone`;
- No componente `Text` deve-se aplicar a estilização `styles.taskTextDone`.

Caso a propriedade `done` esteja como `false`, você deve aplicar as seguintes estilizações:

- No componente `View` deve-se aplicar a estilização `styles.taskMarker`;
- No componente `Text` deve-se aplicar a estilização `styles.taskText`.

### components/Header.tsx

Nesse componente, tudo que você precisa fazer é implementar a lógica do `tasksCounterText` e descomentar o `Text` referente ao render do `tasksCounter` e `tasksCounterText`.

Para o `tasksCounterText`, você precisa atribuir o valor `tarefa` caso o `tasksCounter` for igual a 1. Caso contrário, atribua o valor `tarefas`.