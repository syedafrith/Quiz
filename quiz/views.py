from .models import question, quiz_topics, answers, total_time
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import datetime


def quiz_login(request):
    if request.method == "POST":
        name = request.POST['user_id']
        password = request.POST['password']
        user = authenticate(request, username=name, password=password)
        if user is not None:
            login(request, user)
            return redirect('/quiztopics')
        else:
            return render(request, 'quizlogin.html', {'status': 'incorrect password'})
    return render(request, 'quizlogin.html')


def quiz_topics_page(request):
    topics = quiz_topics.objects.all()
    return render(request, 'quiz_topics.html', {'topics': topics})


def current_time():
    time = datetime.datetime.now()
    return time.strftime("%X")


start_time = []
end_time = []


def main_page(request, topic):
    request.session['topic'] = topic
    student_id = User.objects.get(username=request.user)
    topic_id = quiz_topics.objects.get(topics=topic)
    questions = question.objects.all().filter(topic=topic_id.id).order_by('id')
    pagination = Paginator(questions, 1)
    page_number = request.GET.get('page')
    time = current_time()
    if page_number is None:
        start_time.clear()
        start_time.append(time)
    page_obj = pagination.get_page(page_number)
    question_id = page_obj[0].id
    answer_list = answers.objects.filter(quiz_topic=topic).filter(student_id=student_id.id)
    if answers.objects.filter(quiz_topic=topic).filter(student_id=student_id.id).filter(
            question_id=question_id).exists():
        return render(request, 'quiz.html', {'questions': page_obj, 'status': 'answered'})
    return render(request, 'quiz.html', {'questions': page_obj, 'answer_list': answer_list})


def answer_check(request):
    student_id = User.objects.get(id=request.user.id)
    topic = request.session['topic']
    question_id = request.POST['id']
    submitted_answer = request.POST['choices']
    selected_choice = question.objects.get(id=question_id)
    question_id = question.objects.get(id=question_id)
    new_answer = answers(quiz_topic=topic, question_id=question_id, student_id=student_id, answer=submitted_answer)
    new_answer.save()
    if submitted_answer == selected_choice.answer:
        messages.add_message(request, messages.SUCCESS, 'correct answer')
    else:
        messages.add_message(request, messages.WARNING, 'incorrect answer', extra_tags=selected_choice.answer)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def time_taken():
    t1 = start_time[0]
    t2 = end_time[0]
    FMT = '%H:%M:%S'
    tdelta = datetime.datetime.strptime(t2, FMT) - datetime.datetime.strptime(t1, FMT)
    minutes = divmod(tdelta.seconds, 60)
    return minutes


def final_score(request):
    time = current_time()
    end_time.clear()
    end_time.append(time)
    answer = answers.objects.all().filter(quiz_topic=request.session['topic']).filter(
        student_id=request.user.id).order_by('id')
    topic_id = quiz_topics.objects.get(topics=request.session['topic'])
    student_answer = question.objects.all().filter(topic=topic_id.id).order_by('id')
    totaltime =[]
    totaltime1 = []
    if total_time.objects.all().filter(quiz_topic=request.session['topic']).filter(student_id=request.user.id).exists():
        totaltime1 = total_time.objects.filter(quiz_topic=request.session['topic']).filter(student_id=request.user.id)
    else:
        totaltime = time_taken()
        student_id = User.objects.get(id=request.user.id)
        time_in_words = str(totaltime[0]) + ' minutes ' + str(totaltime[1]) + ' seconds'
        final_time = total_time(quiz_topic=request.session['topic'], student_id=student_id, totaltime=time_in_words)
        final_time.save()
    submitted_answers = []
    quiz_answers = []
    total_marks = 0
    for x in answer:
        submitted_answers.append(x.answer)
    for y in student_answer:
        quiz_answers.append(y.answer)
    for z in range(len(quiz_answers)):
        if submitted_answers[z] == quiz_answers[z]:
            total_marks += 1
    return render(request, 'final_score.html',
                  {'total_marks': total_marks, 'topic': topic_id, 'time_taken': totaltime, 'time_taken1': totaltime1})



