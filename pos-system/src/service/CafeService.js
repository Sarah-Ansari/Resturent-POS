import axios from 'axios';
const baseUrl="http://localhost:3002"
class CafeService{
    
    signinCafe(){
        return axios.get(baseUrl+"/cafe")
    }

// ==================================================


    getEmployees(){
        return axios.get(baseUrl+"/employees")
    }
    getById(id){
        return axios.get(baseUrl+"/employees/employee/"+id)
    }
    updateemp(emp){
        return axios.put(baseUrl+"/employee/employee/"+emp.empid,emp)
    }
    addEmp(emp){
        
       return axios.post(baseUrl+"/employee/employee/"+emp.empid,emp)
    }
}

export default new CafeService();