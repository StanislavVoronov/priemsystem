const DEFAULT_URL='https://monitoring.mgutm.ru/dev-bin/priem_requests'
const DEFAULT_DOMEN='https://monitoring.mgutm.ru/dev-bin/'
export function networkService(service)
{
    let url=service.url ? `${DEFAULT_DOMEN}${service.url}`
          : `${DEFAULT_URL}`;
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
            .then(response=> response.json())
  
}    
