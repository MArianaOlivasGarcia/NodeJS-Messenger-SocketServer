

## Servidor Sockets

### Express - TypeScript

- Autenticación de usuarios - JsonWebToken
- Socket Server
- TypeOrm - Postgres
- Rest Api


### Levantar en desarrollo

1. Clonar repositorio

2. Ejecutar comando yarn install

3. Clonar el archivo ```.env.template``` y renombrar a ```.env```

4. Asignarle valor a las variables de entorno en .env

5. Levantar base de datos
```
docker-compose up -d
```

6. Ejecutar el comando ```yarn start:dev``` para levantar el servidor.