import { useNavigate } from "react-router-dom";
import { CreatePaintInput } from "./types";
import { createPaint } from "../../service/http.service";
import { Paint } from "../../models/art.models";

export const useDependencies = () =>{

    const navigate = useNavigate();

    const handleSubmit = async (values: CreatePaintInput) => {

        //TO DO: 
        

        const picturesBase64: string[] = [];

        console.log("Paint");
        console.log(values);

        
        const cleanBase64String = (base64String: string): string => {
            return base64String.replace(/^data:image\/[a-z]+;base64,/, '');
        };


        const convertImageToBase64 = (file: File): Promise<string> => {

            return new Promise((resolve, reject) => {
            console.log(file);
            
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const base64String = reader.result as string;
                const cleanedBase64 = cleanBase64String(base64String);
                resolve(cleanedBase64);
              };
              reader.onerror = reject;
              
            });
        };

         // Convertir cada imagen a base64 y agregarla a picturesBase64
         for (const pictureFile of values.images) {
            if (pictureFile.originFileObj instanceof File) {
                const base64 = await convertImageToBase64(pictureFile.originFileObj);
                picturesBase64.push(base64);
            } else {
                console.error('Elemento en values.images no es un objeto File:', pictureFile);
            }
          }
        


        const paint:Paint ={
            name: values.name,
            author: values.author,
            date: values.date,
            paints: picturesBase64
            
        }

        const result = await createPaint(paint); 

        console.log(result);
        
        if(result.code == 200){
            console.log("Imagen Guardada");
            navigate('/');
            window.location.reload();
        }else{
            console.log("error");
        }
    }

    
        
    return {
        handleSubmit  
    }

};