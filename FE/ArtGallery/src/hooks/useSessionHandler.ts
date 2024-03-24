import { getSessionToken } from "../service/cookies.service";
import { isNill } from "../utils/comon.utils";


const useSessionHandler = () => {

    /*
	const isSessionExpired = (): boolean => {
		const token = getSessionToken();

		if (isNill(token)) {
			return true;
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			const { exp } = jwt_decode(token as string) as DecodedToken;
			return !(exp > Math.floor(Date.now() / 1000)); //obtiene para ver si esta vencido el token
		}
	}
*/
    const isSessionActive = ():boolean => {
        const token = getSessionToken();

		if (!isNill(token)) {
			return true;
		} else {
            return false;
        }
    }

    return (
        isSessionActive
    )
	

};

export default useSessionHandler

