import axiosInstance from "../axiosInstance";

export const getTodos = async () => {
    try{
        const res = await axiosInstance.get(`/todo`)        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}

export const postTodos = async (title: string, description: string) => {
    try{
        const res = await axiosInstance.post(`/todo`, {title, description})        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}

export const deleteTodo = async (id: string) =>{
    try{
        const res = await axiosInstance.delete(`/todo/${id}`)        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}