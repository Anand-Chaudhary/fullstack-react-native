import { create } from 'zustand'
import * as todoFunc from '../services/api/todos.api';

interface TodoState {
    error: any | null,
    loading: boolean,
    todos: any[] | null
    fetchTodos: () => Promise<void>
    setTodos: ({title, description}: {title: string, description: string}) => Promise<void>
    removeTodos: (id: string) => Promise<void>
}

const useTodos = create<TodoState>((set, get) => ({
    loading: false,
    error: null,
    todos: null,
    fetchTodos: async () => {
        set({
            loading: true,
            error: null,
            todos: null
        })

        try {

            const res = await todoFunc.getTodos()
            set({
                loading: false,
                error: null,
                todos: res?.todos
            })
        } catch (err: Error | any) {
            console.log('Error: ', err?.message)
            set({
                loading: false,
                error: err
            })
        }
    },
    setTodos: async ({
        title, 
        description
    }) => {
        set({
            loading: true,
            error: null,
            todos: null
        })
        try {
            await todoFunc.postTodos(title, description)
            set({
                loading: false,
                error: null
            })
            return get().fetchTodos()
        } catch (err: Error | any) {
            console.log('Error: ', err?.message)
            set({
                loading: false,
                error: err
            })
        }
    },

    removeTodos: async (id) =>{
        set({
            loading: true,
            error: null,
            todos: null
        })
        try {
            await todoFunc.deleteTodo(id)
            set({
                loading: false,
                error: null
            })
            return get().fetchTodos()
        } catch (err: Error | any) {
            console.log('Error: ', err?.message)
            set({
                loading: false,
                error: err
            })
        }
    }
}))

export default useTodos