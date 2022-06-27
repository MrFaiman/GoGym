# GoGym
PWA gather with friends to go to 

## Built with
Mern Stack
- [Next.js](https://nextjs.org/)
- [Mantine](https://mantine.dev/)
- [MongoDB](https://mongodb.com)

### Todo
- Cooldowns for createing workouts
- Nottifications for login & register errors
- Show the workout of a user in the workout card
- Create room to invite your friends so its like a private wokrouts and not everyone see the workouts you/your friends create

### [Live preview](https://gogym.faiman.studio)

## Installation

GoGym requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
cd gogym
npm i
node server
```

Environments variables
```sh
SESSION_SECERET=
CLIENT_URL=
MOGNO_URI=mongodb://[host]/gogym
PORT=
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## License

GNU GPLv3
