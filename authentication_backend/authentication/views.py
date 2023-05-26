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





