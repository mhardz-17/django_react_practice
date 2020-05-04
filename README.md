#Django - React Practice
 This project aims to study python with django/rest framework as backend and react js as frontend.

##Tech
* Backend - Python, Django, Django Rest Framework, Django REST Knox, Mysql for database
* Front End - React JS, redux, reduxsause
* UI - Core UI

## Prerequisites
* Python
* Version 3
* Pip
* Pipenv

##Installation
* Clone Repository
  * `git clone https://github.com/mhardz-17/django_react_practice.git`
* Go to project directory. Change the folder name if you use different name.
  * `cd django_react_practice`
* Install Dependencies for Backend
  * `pipenv shell` - to enter to virtualenv
  * `pipenv install` - to install dependencies on your virtual env
* Setup Mysql (You can use the default storage if you want)
  * Install mysql client based from here -> https://pypi.org/project/mysqlclient/
  * Create your database on mysql 
  * Change your database setting on my_django_react_app/settings.py   
* Run Migration
  * `cd my_django_react_app`
  * `python manage.py migrate`
* Create superuser so that you can login to admin
  * `python manage.py createsuperuser` <- use this cred to login to admin page
* Install frontend dependencies
  * Go to your root project folder and run `npm install`
* Build your frontend assets
  * `npm run {dev,build}` - dev for local and build for production 
* Run your local server
  * `cd my_django_react_app`
  * `python manage.py runserver`
  
##Notes
* Make sure you are inside pipenv shell before making commands or else you will encounter dependecy errors
* Settings for the app are on my_django_react_app/settings.py
* Frontend codes are store on frontend/src
 
##Other Notes
  There may be issue on installation instruction, let me know if what part need to update.
  
###Thanks to the following for the tutorials
* https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react#toc-prerequisites
* Traversy Media -> https://www.youtube.com/playlist?list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60

