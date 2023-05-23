from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def send_email(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if email and otp:
        subject = 'OTP Verification'
        message = f'Your OTP is: {otp}'
        from_email = 'your-email@example.com'  # Replace with your email address

        try:
            send_mail(subject, message, from_email, [email])
            return Response({'message': 'Email sent successfully.'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Email or OTP missing.'}, status=400)


class RegisterView(APIView):
    def post(self, request):
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
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            # User authentication successful, generate token
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            # User authentication failed
            return Response({'error': 'Invalid credentials'}, status=401)
