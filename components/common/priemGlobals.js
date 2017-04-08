import PriemNewRequest from "../PriemNewRequest/PriemNewRequest";
import PriemRegNewPerson from "../PriemRegNewPerson/PriemRegNewPerson"
import PriemUserRequestList from "../PriemUserRequestList/PriemUserRequestList"



export const sortAlfabet=(a, b)=>
{
     var A = a.toLowerCase();
     var B = b.toLowerCase();
     if (A < B){
        return -1;
     }else if (A > B){
       return  1;
     }else{
       return 0;
     }
}
export const  templateTabPanel=(name)=>
{
    switch (name)
    {
       case "PriemNewRequest": return PriemNewRequest
       case "PriemRegNewPerson": return PriemRegNewPerson 
       case "PriemUserRequestList": return PriemUserRequestList
    }
}

const listRequiredData=
{
	"personData": 	{"last_name":'Фамилия',"first_name":'Имя',"birthdate":'День рождение',"sex": 'Пол'},
	"passportData": {"gov":'Гражданство',"seria":'Серия документа',"num":'Номер документа',"org":'Кем выдан',"date": 'Дата выдачи',"type":'Тип документа',"code":'Код подразделения'}
}

export const validateFields=(nameFields,nameList)=>
{
	const validationKeys=Object.keys(nameFields)
	return (Object.keys(listRequiredData[nameList]).filter(item=> !validationKeys.includes(item)))
} 

export const options = {
	    lines: 13,
	    length: 20,
	    width: 10,
	    radius: 30,
	    scale: 0.8,
	    corners: 1,
	    color: '#000',
	    opacity: 0.25,
	    rotate: 0,
	    direction: 1,
	    speed: 1,
	    trail: 60,
	    fps: 20,
	    zIndex: 29,
	    top: window.innerHeight/3+"px",
	    left: window.innerWidth/2.1+"px",
	    shadow: false,
	    hwaccel: false,
	    position: 'absolute'
	};