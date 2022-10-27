import express, { Express } from 'express';
import http from 'http';
import path from 'path';
import { Server as WSServer } from 'socket.io';
import { Sockets } from './sockets.model';
import morgan from 'morgan';
import cors from 'cors'
import { dbConnection } from '../database/config';

// Rutas
import authRoutes from '../routes/auth.routes'
import competitorsRoutes from '../routes/competitors.routes'
import locationsRoutes from '../routes/location.routes'
import customersRoutes from '../routes/customers.routes'
import parksRoutes from '../routes/parks.routes'
import distrosRoutes from '../routes/distros.routes'
import schoolsRoutes from '../routes/school.routes'
import mallsRoutes from '../routes/malls.routes'
import prodRoutes from '../routes/prod.routes'
import clientRoutes from '../routes/clients.routes'
import simulationRoutes from '../routes/simulacion.routes'
import avLocationsRoutes from '../routes/avlocations.routes'

export class Server {

    private readonly app: Express = express();
    private readonly port: number = +process.env.PORT!;
    private readonly server = http.createServer( this.app );    
    private readonly io = new WSServer( this.server )


    constructor() {}


    middlewares() {

        this.app.use(morgan('dev'))

        // Habilitar CORS
        this.app.use(cors())

        // Parseo del body
        this.app.use( express.json() );

        // Habilitar rutas
        this.app.use( '/api/auth', authRoutes);
        this.app.use( '/api/competitors', competitorsRoutes);
        this.app.use( '/api/locations', locationsRoutes);
        this.app.use( '/api/customers', customersRoutes);
        this.app.use( '/api/parks', parksRoutes);
        this.app.use( '/api/distros', distrosRoutes);
        this.app.use( '/api/schools', schoolsRoutes);
        this.app.use( '/api/malls', mallsRoutes);
        this.app.use( '/api/production', prodRoutes);
        this.app.use( '/api/clients', clientRoutes);
        this.app.use( '/api/simulation', simulationRoutes);
        this.app.use( '/api/avlocations', avLocationsRoutes);

        // Carpeta Publica
        this.app.use( express.static( path.resolve( __dirname, '../public') ) );
    }

    init() {

        dbConnection();

        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        const sockets = new Sockets( this.io )
        sockets.handleEvents();

        // Inicializar servidor
        this.server.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`)
        })
    }

}