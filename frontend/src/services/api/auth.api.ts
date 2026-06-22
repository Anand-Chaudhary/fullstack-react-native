import axiosInstance from "../axiosInstance";

export const registerApi = async (email: string, password: string) => {
    try{
        const res = await axiosInstance.post(`/auth/register`,{
            email,
            password
        })        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}

export const loginApi = async (email: string, password: string) => {
    try{
        const res = await axiosInstance.post(`/auth/login`,{
            email,
            password
        })       
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}