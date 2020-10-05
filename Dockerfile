
FROM python:3.7
EXPOSE 8000

ENV IS_DOCKER_ENV 1
ENV ALLOWED_HOSTS 127.0.0.1

ADD . /app/mothership
WORKDIR /app/mothership

RUN pip install --trusted-host pypi.python.org -r requirements.txt

#CMD /bin/bash
CMD python manage.py runserver --insecure 0.0.0.0:8000
