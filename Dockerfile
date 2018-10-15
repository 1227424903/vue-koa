FROM node:9.11.2
RUN apt-get update -y\
&& apt-get install --yes --force-yes nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \
&& npm run build \
&& cp -f nginx.conf /etc/nginx/ \
&& cp -r dist/* /var/www/html \
&& rm -rf /app
CMD ["nginx","-g","daemon off;"]