<<<<<<< HEAD
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from rest_framework.decorators import api_view

from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def send_email(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if email and otp:
        subject = 'OTP Verification'
        message = f'Your OTP is: {otp}'
        from_email = 'gitaubrian425@gmail.com'  # Replace with your email address

        try:
            send_mail(subject, message, from_email, [email])
            return Response({'message': 'Email sent successfully.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Email or OTP missing.'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        email = request.data.get('email')
        password = request.data.get('password')

        # Assuming you have a custom `generate_otp` function to generate OTP
        otp = generate_otp()

        # Save the generated OTP to the database or any other storage method

        if email:
            try:
                send_email(email, otp)  # Send the OTP via email
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            # User authentication successful, generate token
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            # User authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
=======
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from .serializers import AccountCreateSerializer, AccountSerializer, VerifyAccountSerializer
from .email import send_otp_via_email_template
from .models import * 

# Create your views here.
class SignupView(APIView):
    def post(self, request):
        serializer = AccountCreateSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()

            # Send OTP via email
            send_otp_via_email_template(account.email)

            account_data = AccountSerializer(account).data
            return Response({
                'message': 'Account created successfully.',
                'account': account_data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyOTP(APIView):
    def post(self, request):
        serializer = VerifyAccountSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']

            user = UserAccount.objects.filter(email=email).first()

            if not user:
                return Response({'message': "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            if user.otp != otp:
                return Response({'message': 'Wrong OTP'}, status=status.HTTP_400_BAD_REQUEST)

            user.is_verified = True
            user.save()

            return Response({'message': 'Account verified.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        account_data = AccountSerializer(request.user).data
        return Response({
            'message': 'User data retrieved successfully.',
            'account': account_data
        }, status=status.HTTP_200_OK)





>>>>>>> d1d05d9271c89c87d664fb8cbaffb68fd18e05d2
