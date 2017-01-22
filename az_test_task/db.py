from .keys import DB_PASSWORD

db = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': DB_PASSWORD,
        'NAME': 'az_test_task_db',
    }
}