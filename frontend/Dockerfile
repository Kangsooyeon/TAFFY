
FROM nginx
RUN mkdir /deploy
WORKDIR /deploy
RUN mkdir ./build
ADD ./dist ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
