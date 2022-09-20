
export default function GetCategories(){
    const apiUrl = 'https://mocki.io/v1/efa69348-3c4c-46d5-b276-60cf483fb1aa';
    return fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            console.log(response)
            const { message = [] } = response;
            if (Array.isArray(message)) {
                const categories = message.map((user) => {
                    const { module_id,module_name, resume_module } = user;
                    return { module_id,module_name, resume_module };
                });
                console.log(categories)
                return categories;
            }
        });
}
