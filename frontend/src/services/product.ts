import axios from "axios";
const getProduct = async ():Promise<any> =>{
    const config = {
        method: 'get',
        url: 'https://api-ex-reactjs-ts-ron.onrender.com/products',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'https://ronshomerelax.vercel.app/'
        },
    };
    return await axios(config)
        .then((data:any):any=>data.data)
        .catch(function (error) {
            console.log(error);
        });
}
export {
    getProduct,

}