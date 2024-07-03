from rest_framework import serializers
from .models import AdminUser, Form
from django.contrib.auth.models import User

class AdminUserSerial(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email']

class AdminUserSerializer(serializers.ModelSerializer):
    user = AdminUserSerial()
    class Meta:
        model = AdminUser
        fields = ['user',"admin_type"]

class AS(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        exclude = ['password','email']

class FormSerializer(serializers.ModelSerializer):
    approved_by = AdminUserSerializer(many=True,read_only=True)
    class Meta:
        model = Form
        fields = '__all__' 