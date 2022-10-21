export function GetPages() {
  return fetch('https://mocki.io/v1/1b4791c7-bab0-45ba-9a6d-eaa38931218e')
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
  return fetch('https://mocki.io/v1/dba2afcf-7051-462c-9a12-4780509f8c18')
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
