from django.contrib import admin
from .models import question,quiz_topics,answers,total_time
admin.site.register(quiz_topics)
admin.site.register(question)
admin.site.register(answers)
admin.site.register(total_time)
