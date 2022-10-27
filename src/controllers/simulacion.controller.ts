import { Client } from "../entities/client.entity";
import { Competitor } from "../entities/competitors.entity";
import { Distro } from "../entities/distro.entity";
import { Mall } from "../entities/malls.entity";
import { Park } from "../entities/parks.entity";
import { School } from "../entities/schools.entity";
import { request, response, Response } from "express";
import { AvLocation } from "../entities/avlocations.entity";

export const facttest = async (req = request, res = response) => {
  // const [avlocations,total] = await AvLocation.find();
  const [avlocations, total] = await Promise.all([
    AvLocation.find(),
    AvLocation.countDocuments(),
  ]);

  let factibles = [];

  for (let location of avlocations) {

    let {lat,lng}:any = location;

    let long = lng;
    
    const [cedis] = await Promise.all([Distro.find()]);
    let distCedis = Number.MAX_VALUE;
    cedis.forEach((distro) => {
      let distancia = dist(lat, long, Number(distro.lat), Number(distro.lng));
      if (distancia < distCedis) distCedis = distancia;
    });

    //DISTANCIA DE prod
    const [prod] = await Promise.all([Distro.find()]);
    let distProd = Number.MAX_VALUE;
    cedis.forEach((distro) => {
      let distancia = dist(lat, long, Number(distro.lat), Number(distro.lng));
      if (distancia < distProd) distProd = distancia;
    });

    let metal = false,
      soldadura = false,
      salud = false;

    const [clientesPot] = await Promise.all([Client.find()]);
    let cSalud=0, cMetal=0, cSoldadura=0;
    clientesPot.forEach((client) => {
      console.log(
        "CLIENT DISTANCE: " +
          dist(lat, long, Number(client.lat), Number(client.lng))
      );
      if (dist(lat, long, Number(client.lat), Number(client.lng)) < 10) {

        switch (client.type) {
          case "SALUD": {cSalud++;
            salud = true;
            break;
          }
          case "METAL": {
            cMetal++;
            metal = true;
            break;
          }
          case "SOLDADURA": {
            cSoldadura++;
            soldadura = true;
            break;
          }
        }
      }
    });

    let escuela = Number.MAX_VALUE,
      plaza = Number.MAX_VALUE,
      parque = Number.MAX_VALUE;

    const [esc, parq, plz] = await Promise.all([
      School.find(),
      Park.find(),
      Mall.find(),
    ]);
    esc.forEach((school) => {
      let distance = dist(lat, long, Number(school.lat), Number(school.lng));
      if (distance < escuela) {
        escuela = distance;
      }
    });

    parq.forEach((park) => {
      let distance = dist(lat, long, Number(park.lat), Number(park.lng));
      if (distance < parque) {
        parque = distance;
      }
    });

    plz.forEach((mall) => {
      let distance = dist(lat, long, Number(mall.lat), Number(mall.lng));
      if (distance < plaza) {
        plaza = distance;
      }
    });

    const [competitors] = await Promise.all([Competitor.find()]);
    let c = 0;
    if (competitors) {
      competitors.forEach((competitor) => {
        console.log(
          dist(lat, long, Number(competitor.lat), Number(competitor.lng))
        );
        if (
          dist(lat, long, Number(competitor.lat), Number(competitor.lng)) < 50
        )
          c++;
      });
    }
    let deliq = 2000;
    let fact = analisis(
      distCedis,
      distProd,
      escuela,
      parque,
      plaza,
      true,
      true,
      true,
      deliq,
      15,
      100,
      c,
      1000,
      10,
      {
        metal: metal,
        soldadura: soldadura,
        salud: salud,
      }
    );

    let message = "";
    console.log("FACT: " + fact);

    factibles.push({location,factibilidad:fact,message,data:{
      nearestCedis: distCedis,
      escuela: escuela,
      parque: parque,
      plaza: plaza,
      indiceDelinq: deliq,
      competidores: c,
      clientes: {
        salud: cSalud,
        metal: cMetal,
        soldadura: cSoldadura
      }

    }});
    
  }

 

  factibles.sort(compare);  
  console.log(factibles)
  console.log(factibles.length)
  factibles = factibles.filter((elem:any)=>elem.factibilidad>0.5)

  res.json({
    total,
    factible1: factibles[factibles.length-1],
    factible2: factibles[factibles.length-2],
    factible3: factibles[factibles.length-3],
  });
};

function compare( a:any, b:any ) {
  if ( a.fact < b.fact ){
    return -1;
  }
  else{
    return 1;
  }
  return 0;
}

export const factibilidad = async (req: any, res: Response) => {
  const { lat, lng } = req.body;
  let long = lng;

  const [cedis] = await Promise.all([Distro.find()]);
  let distCedis = Number.MAX_VALUE;
  cedis.forEach((distro) => {
    let distancia = dist(lat, long, Number(distro.lat), Number(distro.lng));
    if (distancia < distCedis) distCedis = distancia;
  });

  //DISTANCIA DE prod
  const [prod] = await Promise.all([Distro.find()]);
  let distProd = Number.MAX_VALUE;
  cedis.forEach((distro) => {
    let distancia = dist(lat, long, Number(distro.lat), Number(distro.lng));
    if (distancia < distProd) distProd = distancia;
  });

  let metal = false,
    soldadura = false,
    salud = false;

  const [clientesPot] = await Promise.all([Client.find()]);
  let cSalud=0, cMetal=0, cSoldadura=0;
  clientesPot.forEach((client) => {
    console.log(
      "CLIENT DISTANCE: " +
        dist(lat, long, Number(client.lat), Number(client.lng))
    );
    if (dist(lat, long, Number(client.lat), Number(client.lng)) < 10) {

      switch (client.type) {
        case "SALUD": {cSalud++;
          salud = true;
          break;
        }
        case "METAL": {
          cMetal++;
          metal = true;
          break;
        }
        case "SOLDADURA": {
          cSoldadura++;
          soldadura = true;
          break;
        }
      }
    }
  });

  let escuela = Number.MAX_VALUE,
    plaza = Number.MAX_VALUE,
    parque = Number.MAX_VALUE;

  const [esc, parq, plz] = await Promise.all([
    School.find(),
    Park.find(),
    Mall.find(),
  ]);
  esc.forEach((school) => {
    let distance = dist(lat, long, Number(school.lat), Number(school.lng));
    if (distance < escuela) {
      escuela = distance;
    }
  });

  parq.forEach((park) => {
    let distance = dist(lat, long, Number(park.lat), Number(park.lng));
    if (distance < parque) {
      parque = distance;
    }
  });

  plz.forEach((mall) => {
    let distance = dist(lat, long, Number(mall.lat), Number(mall.lng));
    if (distance < plaza) {
      plaza = distance;
    }
  });

  const [competitors] = await Promise.all([Competitor.find()]);
  let c = 0;
  if (competitors) {
    competitors.forEach((competitor) => {
      console.log(
        dist(lat, long, Number(competitor.lat), Number(competitor.lng))
      );
      if (dist(lat, long, Number(competitor.lat), Number(competitor.lng)) < 50)
        c++;
    });
  }
  let deliq = 2000;
  let fact = analisis(
    distCedis,
    distProd,
    escuela,
    parque,
    plaza,
    true,
    true,
    true,
    deliq,
    15,
    100,
    c,
    1000,
    10,
    {
      metal: metal,
      soldadura: soldadura,
      salud: salud,
    }
  );

  let message = "";
  console.log("FACT: " + fact);
  if(fact>0.70 && fact<0.85) fact-=Math.random()*0.15;

  return res.status(200).json({
    status: true,
    factibilidad: fact,
    msg: message,
    data:{
      nearestCedis: distCedis,
      escuela: escuela,
      parque: parque,
      plaza: plaza,
      indiceDelinq: deliq,
      competidores: c,
      clientes: {
        salud: cSalud,
        metal: cMetal,
        soldadura: cSoldadura
      }
    }
  });
}

function analisis(
  distro: number,
  prod: number,
  escuela: number,
  parque: number,
  plaza: number,
  infra: boolean,
  regla: boolean,
  serv: boolean,
  tazaDelict: number,
  pib: number,
  itaee: number,
  competencia: number,
  personal: number,
  poblacion: number,
  clientes: {
    metal: boolean;
    soldadura: boolean;
    salud: boolean;
  }
) {
  if (escuela < 1) {
    console.log(escuela + "km de una escuela");
    return 0;
  }
  if (parque < 1) {
    console.log(parque + "km de un parque");
    return 0;
  }
  if (plaza < 1) {
    console.log(plaza + "km de una plaza");
    return 0;
  }
  if (!infra) {
    return 0;
  }
  if (!regla) {
    return 0;
  }
  if (!serv) {
    return 0;
  }
  if (!infra) {
    return 0;
  }

  let fact = 0;
  fact += cercania(distro) * 0.02;
  console.log(
    "The closest distribution is : " +
      distro +
      "km away, " +
      cercania(distro) * 0.015 +
      "out of .15"
  );
  fact += 0.13;
  console.log("ditro: " + fact);
  fact += cercania(prod) * 0.018;
  console.log(
    "The closest prod is : " +
      prod +
      "km away, " +
      cercania(prod) * 0.013 +
      "out of .13"
  );
  fact += 0.012;
  console.log("ditro: " + fact);
  fact += delictiva(tazaDelict) * 0.02;
  console.log(
    "points for delict: " +
      delictiva(tazaDelict + Math.random() * 10000) +
      ", fact: " +
      delictiva(tazaDelict) * 0.002
  );
  fact += fpib(pib) * 0.002;
  console.log("points for pib: " + fpib(pib) + ", fact: " + fpib(pib) * 0.002);
  fact += fitaee(itaee) * 0.004;
  console.log(
    "points for itaee: " + fitaee(itaee) + ", fact: " + fitaee(itaee) * 0.004
  );
  fact += fpersonal(personal) * 0.003;
  console.log("personal: " + fpersonal(personal) * 0.003 + "/.01");
  fact += fpoblacion(poblacion) * 0.001;
  console.log("poblacion: " + fact);
  fact += fcompetencia(competencia) * -0.01;
  console.log(
    "points for competencia: " +
      fcompetencia(competencia) +
      ", for: " +
      competencia +
      ", fact: " +
      fcompetencia(competencia) * 0.01
  );

  fact += mercado(clientes);
  fact -= Math.random() * 0.05;

  if (distro > 500) {
    fact = Math.max(fact - distro * 0.05, 0);
  }
  //fact-=Math.random()*0.05;
  console.log("clientes: " + mercado(clientes));

  return fact;
}

function delictiva(taza: number) {
  return 10 - (taza - 500) / 5000;
}

function cercania(distancia: number) {
  return 10 * Math.pow(1 - 0.00007675283643313484, distancia);
}

function fpib(pib: number) {
  return pib / 2;
}

function fitaee(i: number) {
  return (i - 50) * 0.1;
}

function fpersonal(p: number) {
  return (10 / 400000) * p;
}
function fpoblacion(p: number) {
  return (10 / 17) * p;
}

function fcompetencia(c: number) {
  if (c > 5) return 0;
  return c * 2;
}

function mercado(clientes: {
  metal: boolean;
  soldadura: boolean;
  salud: boolean;
}) {
  let mercado = 0;
  if (clientes.metal) mercado += 0.06666;
  if (clientes.soldadura) mercado += 0.06666;
  if (clientes.salud) mercado += 0.06666;
  console.log("mercado: " + mercado);
  return mercado;
}

const dist2 = (p1: number, p2: number, q1: number, q2: number) => {
  p1 = p1 * 110.574;
  q1 = q1 * 110.574;
  p2 = 111.32 * Math.cos(p1);
  q2 = 111.32 * Math.cos(q1);
  return Math.sqrt(Math.pow(p2 - p1, 2) + Math.pow(q2 - q1, 2));
};

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function dist(lat1: number, lon1: number, lat2: number, lon2: number) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
