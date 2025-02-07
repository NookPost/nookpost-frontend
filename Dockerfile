FROM --platform=$BUILDPLATFORM node:23 AS build
ARG TARGETARCH
WORKDIR /source

COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.27.4
WORKDIR /usr/share/nginx/html
COPY --from=build /source/dist .
EXPOSE 80
