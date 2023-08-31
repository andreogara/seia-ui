let url = "https://seia-server-28332f4905ff.herokuapp.com/";
export const getConfigData = async () => {
    const res = await fetch(url);
    return await res.json();
} 

export const saveConfigData = async (data) => {
    return fetch(url, {
      method: "POST", body: JSON.stringify(data), headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
}