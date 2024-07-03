from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import AdminUser, Form
from rest_framework.views import APIView
from django.contrib.sessions.models import Session
from django.contrib.auth import authenticate, login, logout
from .serializers import AdminUserSerializer, FormSerializer
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated


@api_view(["GET"])
def test(request):
    return Response({"message": "API Working"})


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def signup(request):
    serializer = AdminUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", "GET"])
@permission_classes([AllowAny])
def create_form(request):
    if request.method == "POST":
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        form = Form.objects.all()
        serializer = FormSerializer(form, many=True)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def form_detail(request, pk):
    try:
        form = Form.objects.get(pk=pk)
    except Form.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = FormSerializer(form)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = FormSerializer(form, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def Get_form_details(request):
    form = Form.objects.get()
    if request.method == "GET":
        serializer = FormSerializer(form)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def getApproval(request):
    if request.method == "GET" and request.user.is_authenticated:
        try:
            admin = AdminUser.objects.get(user=request.user)
            if admin.admin_type == "AO":
                print("AO")
                forms = Form.objects.filter(
                    form_status="pending", approved_by__isnull=True
                )
                serial = FormSerializer(forms, many=True)
                return Response(serial.data)
            if admin.admin_type == "CEO":
                print("CEO")
                forms = Form.objects.filter(
                    approved_by__isnull=False, approved_by__admin_type="AO"
                )
                serial = FormSerializer(forms, many=True)
                return Response(serial.data)
            if admin.admin_type == "OB":
                print("OB")
                forms = Form.objects.filter(
                    approved_by__isnull=False, approved_by__admin_type="AO"
                ).filter(approved_by__admin_type="CEO")
                serial = FormSerializer(forms, many=True)
                return Response(serial.data)
            if admin.admin_type == "MC":
                print("MC")
                forms = (
                    Form.objects.filter(
                        approved_by__isnull=False, approved_by__admin_type="AO"
                    )
                    .filter(approved_by__admin_type="CEO")
                    .filter(approved_by__admin_type="OB")
                )
                serial = FormSerializer(forms, many=True)
                return Response(serial.data)
            if admin.admin_type == "GC":
                print("GC")
                forms = (
                    Form.objects.filter(
                        approved_by__isnull=False, approved_by__admin_type="AO"
                    )
                    .filter(approved_by__admin_type="CEO")
                    .filter(approved_by__admin_type="OB")
                    .filter(approved_by__admin_type="MC")
                )
                serial = FormSerializer(forms, many=True)
                return Response(serial.data)
            return Response({"message": "No forms found."}, status=status.HTTP_200_OK)

        except AdminUser.DoesNotExist:
            return Response(
                {"error": "Admin user not found."}, status=status.HTTP_404_NOT_FOUND
            )

    if request.method == "POST" and request.user.is_authenticated:
        try:
            reason = request.data["reason"]
            form = Form.objects.get(id=request.data["fid"])
            form.Reasonforrejection = reason
            user = AdminUser.objects.get(user=request.user)
            form.rejected_by.add(user)
            form.save()
            return Response({"message": "Rejected"})
        except:
            form = Form.objects.get(id=request.data["fid"])
            user = AdminUser.objects.get(user=request.user)
            form.approved_by.add(user)
            form.save()
            return Response({"message": "Approved"})
