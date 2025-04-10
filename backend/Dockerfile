FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . .
EXPOSE 9000
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
