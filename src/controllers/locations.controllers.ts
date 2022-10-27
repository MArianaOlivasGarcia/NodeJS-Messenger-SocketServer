import { request, response } from "express";
import { Location } from "../entities/locations.entity";

export const getLocations = async(req = request,res = response) =>{

    const [total,locations] = await Promise.all([
        Location.countDocuments(),
        Location.find(),
    ]);
    
    if(!locations){
        return res.status(400).json({
            status:false,
            msg:'Locations Not Founded'
        });
    }

    res.json({
        status:true,
        total,
        locations
    });
    
}

export const postLocations =async (req = request, res = response) => {
    
    const {Name, lat, lng} = req.body;
    const location = new Location({Name,lat,lng});

    try {

        await location.save();

        res.json({
            msg: "Location added succesfully",
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