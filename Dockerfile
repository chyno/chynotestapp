FROM codewars/node-runner

MAINTAINER John Chynoweth

ENV NODE_ENV=development 
ENV PORT=9002
USER root

WORKDIR   /runner/www
VOLUME ["/runner/www"]

EXPOSE $PORT
#docker run -it -p 9002:9002  --rm --entrypoint  bash -v c:/dev/chynotestapp/server:/var/www chynorun
#ENTRYPOINT ["npm", "start", "index.js"]
