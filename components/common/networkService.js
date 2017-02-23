

export function networkService(service)
{
    const domen='https://monitoring.mgutm.ru/'
    let url=service.url ? `${domen}${service.url}`
          : `${domen}dev-bin/priem_mainsystem`;
    const method=service.method ? service.method : 'GET' 
    const isJsonRes= service.format ? false : true
    const parametrs=isJsonRes ? JSON.stringify(service.data) 
                              : service.data
    const request={
        method,
        credentials:"same-origin",
        header:
        {
                "Accept":"text/plain;charset='UTF-8'",
                "Content-Type": "multipart/formdata"
        }
    }
     
    if (service.formData)
    {
        Object.assign(request,{body:service.formData});
    }
    else if (method=="GET")
    {
        url+=`?${service.name}=${parametrs}`;
    }
    else if (method=="POST")
    {
        const formData = new FormData();
        formData.append(service.name,parametrs);
        Object.assign(request,{body:formData});
    }
  
    return fetch(url,request)
            .then(response=> response.json() )
  
}    
