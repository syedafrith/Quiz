from django.db import models

from django.db import models
from django.contrib.auth.models import User


class quiz_topics(models.Model):
    topics = models.CharField(max_length=200)


class question(models.Model):
    topic = models.ForeignKey(quiz_topics,on_delete=models.CASCADE,default=None)
    question = models.TextField(max_length=500)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)


class answers(models.Model):
    quiz_topic = models.CharField(max_length=200)
    question_id = models.ForeignKey(question,on_delete=models.CASCADE,default=None)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    answer = models.CharField(max_length=100)


class total_time(models.Model):
    quiz_topic = models.CharField(max_length=200)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    totaltime = models.CharField(max_length=100)
