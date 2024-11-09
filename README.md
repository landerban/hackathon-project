# hackathon-project

# Co-Art (다함께 그려요)

- Our website showcases a unique art experience where a new image is featured daily.
- Each image is converted into a pixelated canvas, allowing viewers to add on and modified the art.
- A carefully curated color palette accompanies each pixelated artwork, matching the image's original tones and adding an interactive, dynamic feel.
- After 24 hours, the artwork is moved to the gallery, where users can revisit and explore past creations.
- This evolving collection brings fresh visuals every day, blending technology and creativity in a digital gallery experience.

# 설명

- 우리 웹사이트는 매일 새로운 이미지가 등장하는 독특한 관객 참여형 예술 경험을 제공합니다.
- 각 이미지는 픽셀화된 캔버스로 변환되어, 사용자가 픽셀 위에 획을 추가하고 수정할 수 있습니다.
- 원본 이미지의 색조를 반영한 정교한 팔레트가 각 픽셀화된 작품에 제공되어, 인터랙티브하고 역동적인 느낌을 더합니다.
- 24시간 후, 작품은 갤러리로 이동하여 사용자가 과거 참여한 작품을 검색하고 다시 방문할 수 있습니다.
- 매일 새롭게 갱신되는 이 컬렉션은 기술과 창의성이 조화를 이루는 디지털 갤러리 경험을 선사합니다.

# Backend Database

- Login
- Register
- UserProfile - including the time limit
- (daily) color palette
- Original art
- InProgress Pixel
- Completed Art

# Prerequisites

Instructions for Frontend

Install node from the website

> https://nodejs.org/en

Check the node version

> node -v

Locate the file and go into it

> cd C:\correct_path\Messenger-app

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

> pip install django channels djangorestframework django-cors-headers channels_redis daphne pillow

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
