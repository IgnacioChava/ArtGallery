import { AxiosError } from "axios";
import { getPaints, getPaintsByAny, getPaintsByName } from "../../service/http.service";
import { isNill } from "../../utils/comon.utils";
import useNotificationHandler from "../../hooks/useNotificationHandler";

export const useDependencies = () =>{

    const {setErrorNotification} = useNotificationHandler();

    const handlePetition = async () => {



        //TO DO: 
        //X HACER LA LOGICA DE OBTENER EL TOKEN MEDIANTE EL LOGIN
        //  HACER QUE MUESTRE UN ERROR SI EL LOGIN NO ENTRO
        
        //
        const {failed, success, response} = await getPaints(); 


        

        if(failed == true){
            console.log("no tengo datos");
            console.log("error");
            setErrorNotification("no se han podido recuperar las pinturas", "error");
            
        }else{
            return response?.data;
        }
    }

    const handlePetitionByName = async (name: string) => {


        const {failed, success, response} = await getPaintsByAny(name); 

        console.log(response?.data);


        if(failed == true){
            console.log("no tengo datos");
            console.log("error");
            setErrorNotification("no se han podido recuperar las pinturas by name", "error");
        }else{
            return response?.data;
        }
    }

    
        
    return {
        handlePetition,
        handlePetitionByName 
    }

};