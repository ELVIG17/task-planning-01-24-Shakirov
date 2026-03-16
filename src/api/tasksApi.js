async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

 export const tasksApi = {
    
        list (){
        return request("/api/tasks")
    },

    create(data){
        return request(`/api/tasks`, {
            method: "POST", 
            body: JSON.stringify(data)
        })
    }, 

    update(id, data){
        return request(`/api/tasks/${id}`, {
            method: "PATCH", 
            body:JSON.stringify(data)
        })
    }, 

    remove(id) {
        return request(`/api/tasks/${id}`, {
            method: "DELETE", 
        })
    }



}