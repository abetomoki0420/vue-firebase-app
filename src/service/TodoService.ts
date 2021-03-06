import firebase from "../firebase/firebase";
import { Todo } from "../components/Todo.vue";

class TodoService {
  private db: firebase.firestore.Firestore;
  private targetOwnerId: string;
  private detach: () => void;

  constructor(db: firebase.firestore.Firestore) {
    this.db = db;
    this.targetOwnerId = "";
    this.detach = () => {
      // NO STATEMENT
    };
  }

  subscribe(ownerId: string, callback: (todos: Todo[]) => void) {
    this.unsubscribe = this.db
      .collection("users")
      .doc(ownerId)
      .collection("todos")
      .onSnapshot(snapshot => {
        const todos: Todo[] = [];
        snapshot.forEach(doc => {
          todos.push({
            // @ts-ignore
            id: doc.id,
            ...(doc.data() as Todo)
          });
        });
        callback(todos);
      });
  }

  unsubscribe() {
    this.detach();
  }

  createOwner(ownerId: string) {
    this.db.collection("users").add({
      userId: ownerId
    });
  }

  create(ownerId: string, name: string) {
    this.db
      .collection("users")
      .doc(ownerId)
      .collection("todos")
      .add({
        name,
        isFinished: false
      });
  }

  update(ownerId: string, todo: Todo) {
    this.db
      .collection("users")
      .doc(ownerId)
      .collection("todos")
      .doc(todo.id)
      .update({
        ...todo,
        isFinished: !todo.isFinished
      });
  }

  delete(ownerId: string, todo: Todo) {
    this.db
      .collection("users")
      .doc(ownerId)
      .collection("todos")
      .doc(todo.id)
      .delete();
  }
}

export default new TodoService(firebase.firestore());
