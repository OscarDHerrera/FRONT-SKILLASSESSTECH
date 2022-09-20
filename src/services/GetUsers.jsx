
export default function GetUsers(){
    const apiUrl = 'http://10.40.100.57:8000/user/see_users';

    return fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            const { data = [] } = response;
            if (Array.isArray(data)) {
                const users = data.map((user) => {
                    const { id,email, name, last_name, role } = user;
                    return { id,email, name, last_name, role };
                });
                return users;
            }
        });
}
