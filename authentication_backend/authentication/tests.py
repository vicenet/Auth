from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UserAccount

class SignupViewTestCase(APITestCase):
    def test_signup_view(self):
        url = reverse('signup')
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@example.com',
            'password': 'password123'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserAccount.objects.count(), 1)
        self.assertEqual(UserAccount.objects.get().email, 'johndoe@example.com')

class VerifyOTPViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserAccount.objects.create_user(email='johndoe@example.com', password='password123')
        self.url = reverse('verify-otp')

    def test_verify_otp_view(self):
        data = {
            'email': 'johndoe@example.com',
            'otp': '123456'
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)

    def test_verify_otp_view_invalid_email(self):
        data = {
            'email': 'invalid@example.com',
            'otp': '123456'
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified)

    def test_verify_otp_view_wrong_otp(self):
        data = {
            'email': 'johndoe@example.com',
            'otp': '654321'
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified)

class RetrieveUserViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserAccount.objects.create_user(email='johndoe@example.com', password='password123')
        self.url = reverse('retrieve-user')
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user_view(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['account']['email'], 'johndoe@example.com')
