import React from 'react';
import { useGetUsersQuery } from '../redux/api/userApi';

const Home = () => {
    const {data}=useGetUsersQuery(undefined);
    console.log(data,"clg");
    return (
        <div>
            this is home page
        </div>
    );
};

export default Home;