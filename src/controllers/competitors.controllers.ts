import { request, response } from "express";
import { Competitor } from "../entities/competitors.entity";

export const getCompetitors = async(req = request,res = response) =>{

    const [total,competitors] = await Promise.all([
        Competitor.countDocuments(),
        Competitor.find(),
    ]);
    
    if(!competitors){
        return res.status(400).json({
            status:false,
            msg:'Competitors Not Founded'
        });
    }

    res.json({
        status:true,
        total,
        competitors
    });
    
}

export const postCompetitors =async (req = request, res = response) => {
    
    const {Name, lat, lng} = req.body;
    const competitor = new Competitor({Name,lat,lng});

    try {

        await competitor.save();

        res.json({
            msg: "Competitor added succesfully",
            competitor,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:false,
            error
        });
    }
    
}