import { request, response } from "express";

export const getCustomers = (req = request,res = response) =>{

    let {max}:any = req.params;
    max = Number(max);
    
    let customers = [];

    for(let i = 0; i<max;i++){
        // let lat = math.random(25.652139,25.800267)
        let lat = Math.random() * (25.800267 - 25.652139) + 25.652139;
        // let lng = math.random(-100.147919,-100.407046)
        let lng = Math.random() * (-100.407046 - -100.147919) + -100.147919;
        customers.push({lat,lng})
    }

    // console.log(customers);

    res.json({status:true,customers})
    
}