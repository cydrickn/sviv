FROM php:8 AS base

RUN apt-get update && apt-get install -y git wget
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN ls -a
RUN mv ~/.symfony/bin/symfony /usr/local/bin/symfony
RUN chmod +x /usr/local/bin/symfony

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --filename=composer --install-dir=/usr/local/bin
RUN mkdir /.composer
RUN chmod -Rf 777 /.composer

RUN mkdir /app
WORKDIR /app

COPY .docker/php-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD symfony server:start
