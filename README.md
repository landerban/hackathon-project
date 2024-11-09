# hackathon-project

# CONVAS : an art project with strangers!

- Our website provides users an interactive art experience. 
- Coopreate or compete against strangers from the internet.
- Website features a pixelated canvas, where users can place pixels on.
- The 8 colors that the useres can choose from are carefully curated to match the background image's tone.
- Users can only place one pixel per the given time limit (10 seconds, 60 seconds or 1800 seconds). 
- The canvas is rotated out periodically to ensure a fresh experience. 
- Each canvas has a different collor pallete and a different time limit.
- After the canvas is rotated out, it is saved to the gallery.

# Dependencies

Install node from the website

> https://nodejs.org/en

Check the node version

> node -v

Locate the file and go into it

> cd correct_path\Messenger-app

Install the necessary dependencie

> npm install

Run the dev mode server

> npm run dev

Click on the link

Instructions for Backend

imported

- Django
- channels
- websockets
- channels_redis
- djangorestframework
- django-cors-headers
- daphne
- Pillow
- dotenv

Download Python

> [Go to the official Python website.](https://www.python.org/downloads/)

- Run the downloaded installer.
  > check the box that says "Add Python to PATH"

Check python and pip version

> python --version
> pip --version

Install packages

> pip install django channels djangorestframework django-cors-headers channels_redis daphne pillow djangorestframework-simplejwt

run server (init)

> python manage.py migrate

> python manage.py runserver

run docker for websockets (localhost for now)

> docker run -p 6379:6379 -d redis:5

create admin

> python manage.py createsuperuser

models to db migration

> python manage.py makemigrations

make .env file

> pip install python-dotenv

> then make .env file in HACKATHON-PROJECT folder, write AWS_ACCESS_KEY_ID and AWS_SECRET_KEY_ID like KEY = "~~"
