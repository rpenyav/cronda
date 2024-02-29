# Desplegament d'Aplicació Angular en Servidor Remot amb Docker i Nginx

Aquest document explica com desplegar una aplicació Angular en un servidor remot utilitzant Docker i Nginx com a servidor web.

## Requisits

- Docker instal·lat tant en el teu entorn de desenvolupament com en el servidor remot.
- Accés al servidor remot.
- Un domini apuntant al teu servidor remot.
- Una aplicació Angular preparada per ser desplegada.

## Pas a Pas

### 1. Preparar l'Arxiu `Dockerfile`

Aquest arxiu ja existeix al arrel del projecte

### 2. Preparar l'Arxiu `nginx.conf`

Aquest arxiu ja existeix al arrel del projecte

### 3. Construir i Pujar la Imatge Docker

Construeix la imatge Docker de la teva aplicació:

```bash
docker build -t nom-de-la-teva-imatge .
```

Puja la imatge a un registre de contenedors (per exemple, Docker Hub):

```bash
docker login
docker tag nom-de-la-teva-imatge usuari/nom-de-la-teva-imatge:latest
docker push usuari/nom-de-la-teva-imatge:latest
```

### 4. Desplegar en el Servidor Remot

Connecta't al teu servidor remot i executa:

```bash
docker pull usuari/nom-de-la-teva-imatge:latest
docker run -d -p 80:80 usuari/nom-de-la-teva-imatge:latest
```

Això iniciarà el teu contenidor Docker i servirà la teva aplicació Angular a través de Nginx al port 80.

## Conclusió

Ara la aplicació Angular hauria d'estar accessible des del domini que apunta al teu servidor. Recorda configurar el teu DNS per apuntar al servidor correctament i, si és necessari, configura HTTPS utilitzant certbot o una solució similar per a una connexió segura.
