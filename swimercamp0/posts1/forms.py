from django import forms
from .models import Post1, Comment1

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field


class PostForm(forms.ModelForm):

	class Meta:
		model = Post1

		fields = ["title", "description", "img"]


class CommentForm(forms.ModelForm):

	class Meta:
		model = Comment1
		fields = ["comment"]

	helper = FormHelper()