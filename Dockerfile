FROM --platform=$BUILDPLATFORM node:23 AS build
ARG TARGETARCH
WORKDIR /source

COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.27.4
WORKDIR /usr/share/nginx/html
COPY --from=build /source/dist .
COPY --from=build /source/1-update-api-url.sh /docker-entrypoint.d/1-update-api-url.sh
COPY nginx-conf.d /etc/nginx/conf.d
RUN chmod +x /docker-entrypoint.d/1-update-api-url.sh
EXPOSE 80
