import { useRouter, useSegments } from "expo-router";
import { PropsWithChildren, createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store"
const AuthContext = createContext({});

const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    // console.log("Auth Token: ", authToken);
    const segments = useSegments();
    const router = useRouter()
    console.log(segments);

    // check if token exists in asyncstorage
    useEffect(() => {
      const loadAuthToken = async() => {
        try {
            const response = await SecureStore.getItemAsync("authToken");
            setAuthToken(response);
        } catch (error) {
            return   
        }
      }
      loadAuthToken()
    }, [])
    
    
    useEffect(() => {
        const isAuthGroup = segments[0] === "(auth)";
        if(!authToken && !isAuthGroup){
            router.replace("/SignIn")
        }
        if(authToken && isAuthGroup){
            router.replace("/")
        }
      
    }, [segments, authToken])

    const updateAuthToken = async(newToken: string) => {
        await SecureStore.setItemAsync("authToken", newToken);
        setAuthToken(newToken);
    }

    return(
        <AuthContext.Provider value={{authToken, updateAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
// custom hook to give us access to the context using useContext hook
export const useAuthentication = () => useContext(AuthContext);
