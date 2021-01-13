import Cookies from 'js-cookie';
    export function setUserCookie(info){
        const arr = Object.entries(info);
        arr.forEach(item => {
            Cookies.set(item[0], item[1]);
        })
        return true;
    };
    export function getUserCookie(){
        return {
            username: Cookies.get('username'),
            appkey: Cookies.get('appkey'),
            role: Cookies.get('role'),
            email: Cookies.get('email')
        }
    };
    export function removeUserCookie(){
        Cookies.remove('username'),
        Cookies.remove('appkey'),
        Cookies.remove('role'),
        Cookies.remove('email')
    }
