export function GetPages () {
  return fetch('https://mocki.io/v1/fe0d955d-31d7-4408-8545-fa5a1d84558e')
    .then((response) => response.json())
    .then((res) => {
      const { data = [] } = res
      if (Array.isArray(data)) {
        const pages = data.map((page) => {
          const { id, name, url } = page
          return { id, name, url }
        })
        return pages
      }
    })
}

export function GetSettings () {
  return fetch('https://mocki.io/v1/914544e0-d6cb-439f-93ee-615c082977ed')
    .then((response) => response.json())
    .then((res) => {
      const { data = [] } = res
      if (Array.isArray(data)) {
        const settings = data.map((setting) => {
          const { id, name, url } = setting
          return { id, name, url }
        })
        return settings
      }
    })
}
