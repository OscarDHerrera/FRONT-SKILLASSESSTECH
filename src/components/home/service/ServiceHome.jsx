
export function GetCategories() {
  const apiUrl = 'https://mocki.io/v1/20dde3d2-fbca-4209-9e5d-2a1892c5f6dd';
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { message = [] } = response;
      if (Array.isArray(message)) {
        const categories = message.map((user) => {
          const { module_id, module_link, module_name, resume_module } = user;
          return { module_id, module_link, module_name, resume_module };
        });
        return categories;
      }
    });
}


export function GetSubCategories() {
  const apiUrl = 'https://mocki.io/v1/3aeb943a-4e9e-48e0-9875-868368d752fd';
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { data = [] } = response;
      if (Array.isArray(data)) {
        const subcategories = data.map((subcat) => {
          const { id, subcategorie, questions_link } = subcat;
          return { id, subcategorie, questions_link };
        });
        return subcategories;
      }
    });
}


export function GetQuestions() {
  const apiUrl = 'https://mocki.io/v1/ab812961-c680-4ebb-bf3c-9c040a471c34';
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { myQuestions = [] } = response;
      if (Array.isArray(myQuestions)) {
        const questions = myQuestions.map((myQuestion) => {
          const { id, question } = myQuestion;
          return { id, question };
        });
        return questions;
      }
    });
}
