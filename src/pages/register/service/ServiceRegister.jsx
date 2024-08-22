import axios from 'axios'
import dayjs from 'dayjs'

export async function submitRegisterForm (newPerson) {
  try {
    const formattedBorndate = dayjs(newPerson.born_date).format('YYYY-MM-DD')
    const fortmattedForm = {
      ...newPerson,
      born_date: formattedBorndate
    }

    const { data } = await axios.post(
      'http://localhost:81/account/register/',
      { data_form: fortmattedForm },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return { success: true, data }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Error al registrar'
    return { success: false, error: errorMessage }
  }
}
