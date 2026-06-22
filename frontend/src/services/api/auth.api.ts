import axiosInstance from "../axiosInstance";

export const registerApi = async (email: string, password: string) => {
     console.log("REGISTER API CALLED");
    try{
        const res = await axiosInstance.post(`/auth/register`,{
            email,
            password
        })
        console.log(res.data);
        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}

export const loginApi = async (email: string, password: string) => {
     console.log("LOGIN API CALLED");
    try{
        const res = await axiosInstance.post(`/auth/login`,{
            email,
            password
        })
        console.log(res.data);
        
        return res.data
    } catch(error: Error | any){
        console.error('Error Occured: ', error)
        return
    }
}