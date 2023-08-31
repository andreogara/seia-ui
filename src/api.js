export const getConfigData = async () => {
    const res = await fetch("http://localhost:9000");
    return await res.json();
} 

export const saveConfigData = async (data) => {
    return fetch("http://localhost:9000", {
      method: "POST", body: JSON.stringify(data), headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
}