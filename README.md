
## About Laravel

api-swen is an api for SWEN project.

## Installation api-swen

# Installer les dependnces pour laravel

```bash
composer install
```

# Lancer le server laravel

```bash
composer serve
```

# Visualiser les routes accessible

```bash
php artisan route:list
```


## How to populate database with fake data

```bash
php artisan make:fresh
php artisan db:seed

php artisan db:seed --class=Schedule_SlotSeeder
php artisan db:seed --class=BookingSeeder
```

