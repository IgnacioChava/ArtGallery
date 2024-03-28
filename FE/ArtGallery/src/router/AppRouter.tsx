import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PaintPage from "../pages/PaintPage/PaintPage";
import CreatePaintPage from "../pages/CreatePaintPage/CreatePaintPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import useSessionHandler from "../hooks/useSessionHandler";
import Main from "../pages/Main/Main";




const publicRoutes = () =>  {
    return (
        <Routes>
            
            <Route path="/" element={<Main></Main>}>

                <Route path="/login" element={<LoginPage></LoginPage>}></Route>

                <Route path="/home" element={<HomePage></HomePage>}></Route>

                <Route path="/paints" element={<PaintPage></PaintPage>}></Route>

                <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

            </Route>

        </Routes>
    );
}

const privateRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Main></Main>}>

                <Route path="/home" element={<HomePage></HomePage>}></Route>

                <Route path="/paints" element={<PaintPage></PaintPage>}></Route>

                <Route path="/create" element={<CreatePaintPage></CreatePaintPage>}></Route>

            </Route>
    </Routes>
    );
    
}


const AppRouter = () => {

    
    //create a function that validates the token

    const isSessionActive = useSessionHandler();
    
    return (
       <>
            <BrowserRouter>
                {isSessionActive() != true ? publicRoutes() : privateRoutes()}
            </BrowserRouter>
       </>
    );
}

export default AppRouter;


