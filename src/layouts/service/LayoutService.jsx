export function GetPages() {
  return fetch('https://mocki.io/v1/ddb920bf-98f4-4ed2-ae87-f888103f3c3d')
    .then((response) => response.json())
    .then((res) => {
      const { data = [] } = res;
      if (Array.isArray(data)) {
        const pages = data.map((page) => {
          const { id, name, url } = page;
          return { id, name, url };
        });
        return pages
      }
    });
}

export function GetSettings() {
  return fetch('https://mocki.io/v1/66d2a92d-88d2-4516-82dd-66c264cba45b')
    .then((response) => response.json())
    .then((res) => {
      const { data = [] } = res;
      if (Array.isArray(data)) {
        const settings = data.map((setting) => {
          const { id, name, url } = setting;
          return { id, name, url };
        })
        return settings
      }
    })
}
