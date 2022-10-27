import { request, response } from "express";
import { School } from "../entities/schools.entity";

export const getSchool = async(req = request,res = response) =>{

    const [total,schools] = await Promise.all([
        School.countDocuments(),
        School.find(),
    ]);
    
    if(!schools){
        return res.status(400).json({
            status:false,
            msg:'School Not Founded'
        });
    }

    res.json({
        status:true,
        total,
        schools
    });
    
}

export const postSchool =async (req = request, res = response) => {
    
    const {name, lat, lng} = req.body;
    const location = new School({name,lat,lng});

    try {

        await location.save();

        res.json({
            msg: "School added succesfully",
            location,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            error
        });
    }
    
}