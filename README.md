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

> cd BASE_DIR\Co-Art-app

Install the necessary dependencie

> npm install

Run the dev mode server

> npm run dev

Instructions for Backend

Download Python

> [Go to the official Python website.](https://www.python.org/downloads/)

- Run the downloaded installer.
  > check the box that says "Add Python to PATH"

Check python and pip version

> python --version
> pip --version

Locate the file and go into it

> cd BASE_DIR\project

Install packages

> pip install -r requirements.txt

prepare DB (init)

> python manage.py makemigrations

> python manage.py migrate

create admin

> python manage.py createsuperuser

run server

> python manage.py runserver
