import { useNavigate } from "react-router-dom";
import { Login } from "../../models/art.models";
import { LoginForm } from "./types";
import { postLogin } from "../../service/http.service";
import { setSessionToken } from "../../service/cookies.service";
import useNotificationHandler from "../../hooks/useNotificationHandler";

export const useDependencies = () =>{

    const navigate = useNavigate();

    const {setErrorNotification} = useNotificationHandler();

    const handleSubmit = async (values: LoginForm) => {
        
        //TO DO: 
        //X HACER LA LOGICA DE OBTENER EL TOKEN MEDIANTE EL LOGIN
        //X  HACER QUE MUESTRE UN ERROR SI EL LOGIN NO ENTRO
        console.log("Login");
        console.log(values);

        const user: Login = {
			username: values.username,
			password: values.password,
		};

        const result = await postLogin(user); 

        if(result.failed){
            console.log("no tengo token");
            console.log("error");
            setErrorNotification("El sign up ha fallado, intente de nuevo", "error");
        }else{
            console.log("tengo token y la guardare");
            setSessionToken(result.response?.data.token as string);
            navigate('/');
            window.location.reload();
        }
    }

    
        
    return {
        handleSubmit  
    }

};