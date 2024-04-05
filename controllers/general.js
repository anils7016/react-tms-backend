import User from '../models/User.js';

export const getUser = async (req, res) => {
    console.log('req', req)
    try{
        const {id} = req.params;
        console.log('id', id)
        const user = await User.findById(id);
        console.log('user', user)
        res.status(200).json(user);
    }catch(error){
        res.status(400).json( {message: error.message })
    } 


}