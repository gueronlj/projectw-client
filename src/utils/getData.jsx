const getData = async (endpoint, user_id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_id }),
        });
        const data = await response.json();
        if (data.error) {
            return data.error;
        }   
        return data;
    }catch(error){
        return error;
    }
}

export default getData;