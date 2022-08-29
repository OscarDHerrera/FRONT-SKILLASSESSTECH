
export default function GetPersons(){
    const apiUrl = 'http://localhost:8000/fast-practice/see_person';

    return fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            const { data = [] } = response;
            if (Array.isArray(data)) {
                const persons = data.map((person) => {
                    const { id,gender, name, age } = person;
                    return { id,gender, name, age };
                });
                return persons;
            }
        });
}
