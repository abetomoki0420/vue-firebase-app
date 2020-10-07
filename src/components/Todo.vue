<template>
  <div class="container">
    <h1>Todo App</h1>
      <div class="input-form">
        <label for="todo_name">タスク名</label>
        <input
          v-model="todoName"
          id="todo_name"
          class="input-form-name"
          type="text"
        />
        <button @click="registerTodo" class="input-form-submit">登録</button>
      </div>
      <ul class="todos">
        <template v-if="todos.length > 0">
          <li class="todos-item" v-for="(todo, index) in todos" :key="index">
            <div>
              <span @click="checkTodo(todo)" class="todos-item-check">
                [
                {{ todo.isFinished ? "x" : "" }}
                ]
              </span>
              <span>
                {{ todo.name }}
              </span>
              <span @click="deleteTodo(todo)" class="todos-item-delete">
                X
              </span>
            </div>
          </li>
        </template>
        <template v-else>
          <span>タスクはありません</span>
        </template>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export interface Todo {
  id: string;
  name: string;
  isFinished: boolean;
}

interface Data {
  email: string;
  password: string;
  todos: Todo[];
  todoName: string;
}

export default Vue.extend({
  name: "Todo",
  data: (): Data => ({
    email: "",
    password: "",
    todos: [],
    todoName: ""
  }),
  methods: {
    registerTodo() {
      // タスク登録処理
      this.todos.push({
        id: new Date().toISOString(),
        name: this.todoName,
        isFinished: false
      })

      this.todoName = "";
    },
    checkTodo(todo: Todo) {
      // チェック処理
      todo.isFinished = !todo.isFinished;
    },
    deleteTodo(todo: Todo) {
      // 削除処理
      const idx = this.todos.findIndex( _todo => {
        return _todo.id === todo.id
      });

      this.todos.splice(idx,1);
    }
  }
});
</script>

<style lang="scss">
// 全体のレイアウト
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
}

// ヘッダーのレイアウト
.navbar {
  &-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &-logout {
    margin-left: 4px;
  }
}

// タスク入力フォームのレイアウト
.input-form {
  &-name {
    margin-left: 4px;
  }
  &-submit {
    margin-left: 4px;
  }
}

// Todoタスクのレイアウト
.todos {
  font-size: 1.2rem;
  background-color: white;
  &-item {
    margin-top: 8px;
    &-check,
    &-delete {
      cursor: pointer;
    }
  }
}
</style>
