from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import AdminUser, Form
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate, login, logout
from .serializers import AdminUserSerializer, FormSerializer,UpFormSerializer
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated


@api_view(["GET"])
def test(request):
    return Response({"message": "API Working"})


class LoginView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Your authentication logic here
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    
    
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
                forms = Form.objects.filter(approved_by__isnull=True)
                serial = FormSerializer(forms, many=True)
                rejform = Form.objects.filter(rejected_by__isnull=False)
                rejserial = FormSerializer(rejform,many=True)
                acpform = Form.objects.filter(approved_by__admin_type="AO")
                acpserial = FormSerializer(acpform,many=True)
                cont = {
                    "pending":serial.data,
                    "rejected":rejserial.data,
                    "approved":acpserial.data
                }
                return Response(cont)
            if admin.admin_type == "CEO":
                print("CEO")
                forms = Form.objects.filter(approved_by__isnull=False, approved_by__admin_type="AO").exclude(approved_by__admin_type="CEO")
                serial = FormSerializer(forms, many=True)
                rejform = Form.objects.filter(rejected_by__isnull=False)
                rejserial = FormSerializer(rejform,many=True)
                acpform = Form.objects.filter(approved_by__admin_type="CEO")
                acpserial = FormSerializer(acpform,many=True)
                cont = {
                    "pending":serial.data,
                    "rejected":rejserial.data,
                    "approved":acpserial.data
                }
                return Response(cont)
            if admin.admin_type == "OB":
                print("OB")
                forms = Form.objects.filter(approved_by__isnull=False, approved_by__admin_type="AO").filter(approved_by__admin_type="CEO").exclude(approved_by__admin_type="OB")
                serial = FormSerializer(forms, many=True)
                rejform = Form.objects.filter(rejected_by__isnull=False)
                rejserial = FormSerializer(rejform,many=True)
                acpform = Form.objects.filter(approved_by__admin_type="OB")
                acpserial = FormSerializer(acpform,many=True)
                cont = {
                    "pending":serial.data,
                    "rejected":rejserial.data,
                    "approved":acpserial.data
                }
                return Response(cont)
            if admin.admin_type == "MC":
                print("MC")
                forms = (Form.objects.filter(approved_by__isnull=False, approved_by__admin_type="AO").filter(approved_by__admin_type="CEO").filter(approved_by__admin_type="OB")).exclude(approved_by__admin_type="MC")
                serial = FormSerializer(forms, many=True)
                rejform = Form.objects.filter(rejected_by__isnull=False)
                rejserial = FormSerializer(rejform,many=True)
                acpform = Form.objects.filter(approved_by__admin_type="MC")
                acpserial = FormSerializer(acpform,many=True)
                cont = {
                    "pending":serial.data,
                    "rejected":rejserial.data,
                    "approved":acpserial.data
                }
                return Response(cont)
            if admin.admin_type == "GC":
                print("GC")
                forms = (Form.objects.filter(approved_by__isnull=False, approved_by__admin_type="AO").filter(approved_by__admin_type="CEO").filter(approved_by__admin_type="OB").filter(approved_by__admin_type="MC")).exclude(approved_by__admin_type="GC")
                serial = FormSerializer(forms, many=True)
                rejform = Form.objects.filter(rejected_by__isnull=False)
                rejserial = FormSerializer(rejform,many=True)
                acpform = Form.objects.filter(approved_by__admin_type="GC")
                acpserial = FormSerializer(acpform,many=True)
                cont = {
                    "pending":serial.data,
                    "rejected":rejserial.data,
                    "approved":acpserial.data
                }
                return Response(cont)
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
            form.form_status = "rejected"
            user = AdminUser.objects.get(user=request.user)
            form.rejected_by.add(user)
            form.save()
            return Response({"message": "Rejected"})
        except:
            form = Form.objects.get(id=request.data["fid"])
            user = AdminUser.objects.get(user=request.user)
            form.form_status = "Approved by AO" if user.admin_type=="AO" else "Approved by CEO" if user.admin_type == "CEO" else "Approved by Membership Committee" if user.admin_type == "MC" else "Approved by OB" if user.admin_type == "OB" else "waiting for payment" if user.admin_type == "GC" else None
            form.approved_by.add(user)
            form.save()
            return Response({"message": "Approved"})


@api_view(["GET","POST"])
def update_form(request):
    if request.method == "GET":
        form = Form.objects.get(pk=request.data['id'])
        serial = FormSerializer(form)
        return Response(serial.data)
    
@api_view(["POST","PUT"])
def existingLogin(request): 
    if request.method == "POST":
        email = request.data['email']
        aadhar = request.data['aadhar']
        try:
            form = Form.objects.get(Communicationdetails_email=email, Legalinfo_aadhar=aadhar)
            serial = FormSerializer(form)
            print("Login Success")
            return Response(serial.data)
        except Form.DoesNotExist:
            return Response("Invalid Crediantials")
    if request.method == "PUT":
        print(request.data)
        try:
            form = Form.objects.get(pk=request.data.get('id'))
        except Form.DoesNotExist:
            return Response("Form not found", status=status.HTTP_404_NOT_FOUND)
        
        serializer = UpFormSerializer(form, data=request.data)  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)