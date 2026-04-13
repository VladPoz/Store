import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export const UserRegister = async (UserName, UserEmail, UserPassword) => {
    try {
        const response = await axios.post('/auth/register', {
            'name': UserName,
            'email': UserEmail,
            'password': UserPassword,
        });
        return response.data;
    }catch(err) {
        return {'err': err.response?.data?.errors};
    }
};

export const UserLogin = async (UserEmail, UserPassword) =>{
    try{
        const response = await axios.post('/auth/login',{
            'email': UserEmail,
            'password': UserPassword,
        });
        return response.data;
    }catch(err){
        return {'err': err.response.data?.errors};
    }
};

export const getUserProfile = async () => {
    try{
        const response = await axios.get('/user/profile');
        return response.data;
    }catch(err){
        console.log(err.response?.data?.message);
        return null;
    }
};

export const getUserBasket = async () => {
    try{
        const response = await axios.get('/basket');
        return response.data;
    }
    catch(err){
        return null;
    }
};

export const UserBasketDelete = async (id) => {
    try{
        const response = await axios.delete(`/basket/${id}/destroy`);
    }catch(err){
        return null;
    }
}

export const UserLogout = async () => {
    try {
        const response = await axios.post('/auth/logout');
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return null;
    }
};

export const UserUpdate = async (userName, userEmail, userPassword) => {
    try{
        const response = await axios.put('/user/update', {
            'name': userName,
            'email': userEmail,
            'password': userPassword,
        });
        return response.data;
    }catch(err){
        return {'err': err.response?.data?.message};
    }
}

export const UserDelete = async () => {
    try{
        const response = await axios.delete('/user/destroy');
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return null;
    }
}

export const getUserProducts = async () => {
    try{
        const response = await axios.get('/product/profile');
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return null;
    }
}

export const postCreateProduct = async (formData) => {
    try {
        const response = await axios.post('/product/store', formData)
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return {'err': err.response?.data?.errors};
    }
}

export const getProducts = async () => {
    try{
        const response = await axios.get('/product');
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return {'err': err.response?.data?.errors};
    }
}

export const getProduct = async (ProductId) => {
    try{
        const response = await axios.get(`/product/${ProductId}`);
        return response.data;
    }catch(err){
        console.log(err.response?.data?.errors);
        return null;
    }
}