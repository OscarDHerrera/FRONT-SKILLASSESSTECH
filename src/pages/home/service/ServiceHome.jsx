import api from '../../../api'

export async function GetCategories () {
  const response = await api.get('/offers/')
  // console.log(response.data)
  return Array.from(response.data)
}

export function GetSubCategories () {
  const apiUrl = 'https://mocki.io/v1/e37474f5-5ec4-41b9-8745-e93e80b81f82'
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { data = [] } = response
      if (Array.isArray(data)) {
        const subcategories = data.map((subcat) => {
          const { id, subcategorie, questionsLink } = subcat
          return { id, subcategorie, questionsLink }
        })
        return subcategories
      }
    })
}

export function GetQuestions () {
  const apiUrl = 'https://mocki.io/v1/ab812961-c680-4ebb-bf3c-9c040a471c34'
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
      const { myQuestions = [] } = response
      if (Array.isArray(myQuestions)) {
        const questions = myQuestions.map((myQuestion) => {
          const { id, question } = myQuestion
          return { id, question }
        })
        return questions
      }
    })
}

// Ejemplo de construccion de las consultas a la API
// export function GetPages () {
//   const apiUrl = 'http://127.0.0.1:8000/SAT/pages'
//   return axios.get(apiUrl)
//     .then((res) => res.data)
//     .then((res) => {
//       const { data = [] } = res
//       if (Array.isArray(data)) {
//         const pages = data.map((page) => {
//           const { id, name, url } = page
//           return { id, name, url }
//         })
//         return pages
//       }
//     }
//     )
// }
